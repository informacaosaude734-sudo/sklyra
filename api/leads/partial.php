<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';
rate_limit('leads_partial', 20, 300);

$input = json_input();
$nome = trim((string)($input['nome'] ?? ''));
$email = trim((string)($input['email'] ?? ''));
$whatsapp = trim((string)($input['whatsapp'] ?? ''));
$stepReached = (int)($input['step_reached'] ?? 0);

if ($nome === '') {
    json_response(['ok' => true]);
}

$stmt = db()->prepare('INSERT INTO partial_leads (nome, email, whatsapp, step_reached) VALUES (?, NULLIF(?, \'\'), NULLIF(?, \'\'), ?)');
$stmt->bind_param('sssi', $nome, $email, $whatsapp, $stepReached);
$stmt->execute();

json_response(['ok' => true]);
