<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';
rate_limit('leads_submit', 10, 300);

$input = json_input();
$nome = trim((string)($input['nome'] ?? ''));
$empresa = trim((string)($input['empresa'] ?? '-'));
$email = trim((string)($input['email'] ?? ''));
$whatsapp = trim((string)($input['whatsapp'] ?? ''));
$whatsappCountry = trim((string)($input['whatsappCountry'] ?? ''));
$segmento = trim((string)($input['segmento'] ?? '-'));
$score = (int)($input['score'] ?? 0);
$lang = (($input['lang'] ?? '') === 'en') ? 'en' : 'pt';

if ($nome === '' || $email === '' || $whatsapp === '') {
    json_response(['error' => 'missing_fields'], 422);
}

$stmt = db()->prepare('INSERT INTO leads (nome, empresa, email, whatsapp, segmento, status, score) VALUES (?, ?, ?, ?, ?, \'novo\', ?)');
$stmt->bind_param('sssssi', $nome, $empresa, $email, $whatsapp, $segmento, $score);
$stmt->execute();

$safeName = htmlspecialchars($nome, ENT_QUOTES, 'UTF-8');

$templateFile = __DIR__ . '/../emails/lead-confirmation-' . $lang . '.html';
$subject = $lang === 'en'
    ? 'We got your free diagnosis request, ' . $nome
    : 'Recebemos seu pedido de diagnóstico, ' . $nome;

if (is_file($templateFile)) {
    $placeholder = $lang === 'en' ? '[Name]' : '[Nome]';
    $body = str_replace($placeholder, $safeName, file_get_contents($templateFile));
    send_email($email, $nome, $subject, $body);
} else {
    error_log('lead email template missing: ' . $templateFile);
}

$whatsappDigits = preg_replace('/\D/', '', $whatsapp);
if ($whatsappDigits !== '') {
    $callingCode = $whatsappCountry === 'US' ? '1' : ($whatsappCountry === 'BR' ? '55' : '');
    if ($callingCode !== '') {
        // Approved Zernio template "consulta" (marketing, pt_BR): {{1}} = nome.
        // Used for both languages since no English template is approved yet.
        send_whatsapp_template($callingCode . $whatsappDigits, 'consulta', 'pt_BR', [$nome]);
    }
}

$notifyEmail = getenv('LEAD_NOTIFY_EMAIL') ?: '';
if ($notifyEmail !== '') {
    $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $safeWhatsapp = htmlspecialchars($whatsapp, ENT_QUOTES, 'UTF-8');
    $safeEmpresa = htmlspecialchars($empresa, ENT_QUOTES, 'UTF-8');
    $safeSegmento = htmlspecialchars($segmento, ENT_QUOTES, 'UTF-8');
    send_email(
        $notifyEmail,
        'Sklyra',
        'Novo lead: ' . $nome,
        "<p>Novo lead recebido pelo site:</p>"
        . "<ul>"
        . "<li><strong>Nome:</strong> {$safeName}</li>"
        . "<li><strong>Empresa:</strong> {$safeEmpresa}</li>"
        . "<li><strong>Email:</strong> {$safeEmail}</li>"
        . "<li><strong>WhatsApp:</strong> {$safeWhatsapp}</li>"
        . "<li><strong>Segmento:</strong> {$safeSegmento}</li>"
        . "<li><strong>Score:</strong> {$score}</li>"
        . "</ul>"
    );
}

json_response(['ok' => true, 'id' => db()->insert_id]);
