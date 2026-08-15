<?php
declare(strict_types=1);

/**
 * Loads KEY=VALUE pairs from .env into the environment (idempotent).
 */
function load_env(): void
{
    static $loaded = false;
    if ($loaded) {
        return;
    }
    $loaded = true;

    $path = dirname(__DIR__) . '/.env';
    if (!is_file($path)) {
        return;
    }

    foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
            continue;
        }
        [$key, $value] = explode('=', $line, 2);
        $key = trim($key);
        $value = trim($value);
        if ($key !== '' && getenv($key) === false) {
            putenv("$key=$value");
            $_ENV[$key] = $value;
        }
    }
}

load_env();

// Never leak the PHP version or raw error/stack-trace output to clients;
// errors still go to the server log (log_errors is on in php.ini).
header_remove('X-Powered-By');
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
set_exception_handler(function (\Throwable $e): void {
    error_log('Uncaught exception: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    json_response(['error' => 'internal_error'], 500);
});

const ALLOWED_ORIGINS = [
    'http://localhost:8080',
    'https://sklyra.com',
    'https://www.sklyra.com',
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

date_default_timezone_set('UTC');

function json_input(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function db(): mysqli
{
    static $db = null;
    if ($db instanceof mysqli) {
        return $db;
    }

    $db = new mysqli(
        getenv('DB_HOST') ?: '127.0.0.1',
        getenv('DB_USER') ?: 'root',
        getenv('DB_PASS') ?: '',
        getenv('DB_NAME') ?: 'devtone_local',
    );
    if ($db->connect_errno) {
        error_log('DB connection failed: ' . $db->connect_error);
        json_response(['error' => 'db_connection_failed'], 500);
    }

    $db->set_charset('utf8mb4');
    return $db;
}

/**
 * Simple file-based fixed-window rate limiter keyed by client IP + bucket name.
 * Returns silently if under the limit; responds 429 and exits otherwise.
 */
function rate_limit(string $bucket, int $maxRequests, int $windowSeconds): void
{
    $dir = dirname(__DIR__) . '/storage/ratelimit';
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $window = intdiv(time(), $windowSeconds);
    $file = $dir . '/' . preg_replace('/[^a-zA-Z0-9_]/', '_', $bucket) . '_' . md5($ip) . '_' . $window . '.txt';

    $handle = fopen($file, 'c+');
    if ($handle === false) {
        return;
    }

    flock($handle, LOCK_EX);
    $count = (int)(stream_get_contents($handle) ?: '0');
    $count++;
    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, (string)$count);
    fflush($handle);
    flock($handle, LOCK_UN);
    fclose($handle);

    if ($count > $maxRequests) {
        json_response(['error' => 'rate_limited'], 429);
    }
}

/**
 * Verifies a Cloudflare Turnstile token server-side. Returns true (no-op) if
 * TURNSTILE_SECRET_KEY isn't configured in .env, matching the frontend's own
 * disabled-when-unconfigured behavior (src/config/turnstile.ts). Once a real
 * secret is set, a missing/invalid token is rejected.
 */
function turnstile_verify(string $token): bool
{
    $secret = getenv('TURNSTILE_SECRET_KEY') ?: '';
    if ($secret === '') {
        return true;
    }
    if ($token === '') {
        return false;
    }

    $ch = curl_init('https://challenges.cloudflare.com/turnstile/v0/siteverify');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]),
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        return false;
    }

    $data = json_decode($response, true);
    return ($data['success'] ?? false) === true;
}

function public_upload_url(string $relativePath): string
{
    return sprintf('http://localhost/%s', ltrim(str_replace('\\', '/', $relativePath), '/'));
}

/**
 * Sends an email via the SMTP credentials configured in .env.
 * Returns true on success; logs and returns false on failure (never throws to the caller).
 */
function send_email(string $toEmail, string $toName, string $subject, string $htmlBody): bool
{
    require_once __DIR__ . '/lib/PHPMailer/Exception.php';
    require_once __DIR__ . '/lib/PHPMailer/PHPMailer.php';
    require_once __DIR__ . '/lib/PHPMailer/SMTP.php';

    $host = getenv('SMTP_HOST') ?: '';
    $port = (int)(getenv('SMTP_PORT') ?: 465);
    $user = getenv('SMTP_USER') ?: '';
    $pass = getenv('SMTP_PASS') ?: '';
    $from = getenv('SMTP_FROM') ?: $user;
    $fromName = getenv('SMTP_FROM_NAME') ?: 'Sklyra';

    if ($host === '' || $user === '' || $pass === '') {
        error_log('send_email: SMTP not configured, skipping send to ' . $toEmail);
        return false;
    }

    $mail = new PHPMailer\PHPMailer\PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = $host;
        $mail->SMTPAuth = true;
        $mail->Username = $user;
        $mail->Password = $pass;
        $mail->SMTPSecure = $port === 465
            ? PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
            : PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $port;
        $mail->CharSet = 'UTF-8';

        $mail->setFrom($from, $fromName);
        $mail->addReplyTo($from, $fromName);
        $mail->addAddress($toEmail, $toName);

        $logoPath = dirname(__DIR__) . '/sklyra-arrow.png';
        if (is_file($logoPath) && str_contains($htmlBody, 'cid:sklyralogo')) {
            $mail->addEmbeddedImage($logoPath, 'sklyralogo', 'sklyra-arrow.png', 'base64', 'image/png');
        }

        $featureIcons = [
            'icongoogle' => 'icon-google.png',
            'iconvisibility' => 'icon-visibility.png',
            'iconrecommendations' => 'icon-recommendations.png',
            'iconphone' => 'icon-phone.png',
            'iconwhatsapp' => 'icon-whatsapp.png',
            'iconfacebook' => 'icon-facebook.png',
            'iconinstagram' => 'icon-instagram.png',
            'iconwebsite' => 'icon-website.png',
        ];
        foreach ($featureIcons as $cid => $filename) {
            $iconPath = dirname(__DIR__) . '/' . $filename;
            if (is_file($iconPath) && str_contains($htmlBody, 'cid:' . $cid)) {
                $mail->addEmbeddedImage($iconPath, $cid, $filename, 'base64', 'image/png');
            }
        }

        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $htmlBody;
        $mail->AltBody = trim(html_entity_decode(strip_tags(
            preg_replace('/<(style|script)\b[^>]*>.*?<\/\1>/is', '', $htmlBody)
        ), ENT_QUOTES, 'UTF-8'));
        $mail->XMailer = ' ';

        $mail->send();
        return true;
    } catch (\Throwable $e) {
        error_log('send_email failed: ' . $e->getMessage());
        return false;
    }
}

/**
 * Looks up the connected WhatsApp account id on Zernio (cached for the request).
 * Returns null if no WhatsApp account is connected or the lookup fails.
 */
function zernio_whatsapp_account_id(string $apiKey): ?string
{
    static $cached = false;
    static $accountId = null;
    if ($cached) {
        return $accountId;
    }
    $cached = true;

    $ch = curl_init('https://zernio.com/api/v1/accounts?platform=whatsapp&status=connected');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $apiKey],
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $status !== 200) {
        error_log('zernio_whatsapp_account_id: lookup failed, status ' . $status);
        return null;
    }

    $data = json_decode($response, true);
    $accountId = $data['accounts'][0]['_id'] ?? null;
    return $accountId;
}

/**
 * Sends a WhatsApp message via Zernio (Meta Direct Send / utility category).
 * $toPhone must be digits only, international format with country code, no leading +.
 * Never throws; returns true on success, false otherwise (never blocks the caller).
 */
function send_whatsapp(string $toPhone, string $message, string $category = 'utility'): bool
{
    return zernio_send_whatsapp($toPhone, ['message' => $message, 'category' => $category]);
}

/**
 * Sends an approved WhatsApp template message via Zernio.
 * $toPhone must be digits only, international format with country code, no leading +.
 * $templateParams are the template's variable values, in the order they appear
 * across the whole template (header, then body, then button).
 * Never throws; returns true on success, false otherwise (never blocks the caller).
 */
function send_whatsapp_template(string $toPhone, string $templateName, string $templateLanguage, array $templateParams = []): bool
{
    return zernio_send_whatsapp($toPhone, [
        'templateName' => $templateName,
        'templateLanguage' => $templateLanguage,
        'templateParams' => $templateParams,
    ]);
}

function zernio_send_whatsapp(string $toPhone, array $payload): bool
{
    $apiKey = getenv('ZERNIO_API_KEY') ?: '';
    if ($apiKey === '' || $toPhone === '') {
        return false;
    }

    $accountId = zernio_whatsapp_account_id($apiKey);
    if ($accountId === null) {
        error_log('send_whatsapp: no connected WhatsApp account found on Zernio');
        return false;
    }

    $ch = curl_init('https://zernio.com/api/v1/inbox/conversations');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey,
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode(array_merge([
            'accountId' => $accountId,
            'participantId' => $toPhone,
        ], $payload)),
        CURLOPT_TIMEOUT => 10,
    ]);
    $response = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($status < 200 || $status >= 300) {
        error_log('send_whatsapp failed: HTTP ' . $status . ' — ' . $response);
        return false;
    }

    return true;
}
