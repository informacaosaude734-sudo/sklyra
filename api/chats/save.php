<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';
rate_limit('chats_save', 30, 300);

$input = json_input();
$conversationId = (int)($input['conversationId'] ?? 0);
$editToken = trim((string)($input['editToken'] ?? ''));
$userName = trim((string)($input['userName'] ?? ''));
$userEmail = trim((string)($input['userEmail'] ?? ''));
$messages = $input['messages'] ?? [];
$messagesJson = json_encode(is_array($messages) ? $messages : [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

if ($conversationId > 0) {
    // The edit token proves the caller is the same browser that created this
    // conversation — without it, conversation ids are sequential and guessable,
    // letting anyone overwrite anyone else's chat history.
    $stmt = db()->prepare('SELECT edit_token FROM chat_conversations WHERE id = ?');
    $stmt->bind_param('i', $conversationId);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();

    if ($row === null) {
        json_response(['error' => 'not_found'], 404);
    }
    if ($row['edit_token'] === null || $editToken === '' || !hash_equals($row['edit_token'], $editToken)) {
        json_response(['error' => 'forbidden'], 403);
    }

    $stmt = db()->prepare('UPDATE chat_conversations SET user_name = ?, user_email = NULLIF(?, \'\'), messages = ?, updated_at = UTC_TIMESTAMP() WHERE id = ?');
    $stmt->bind_param('sssi', $userName, $userEmail, $messagesJson, $conversationId);
    $stmt->execute();
    json_response(['ok' => true, 'id' => $conversationId]);
}

$turnstileToken = trim((string)($input['turnstileToken'] ?? ''));
if (!turnstile_verify($turnstileToken)) {
    json_response(['error' => 'captcha_failed'], 422);
}

$newEditToken = bin2hex(random_bytes(24));
$stmt = db()->prepare('INSERT INTO chat_conversations (user_name, user_email, edit_token, messages) VALUES (?, NULLIF(?, \'\'), ?, ?)');
$stmt->bind_param('ssss', $userName, $userEmail, $newEditToken, $messagesJson);
$stmt->execute();

json_response(['ok' => true, 'id' => db()->insert_id, 'editToken' => $newEditToken]);
