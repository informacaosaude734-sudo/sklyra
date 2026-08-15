<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';

$result = db()->query('SELECT COUNT(*) AS total FROM leads');
$row = $result->fetch_assoc();

json_response(['count' => (int)$row['total']]);
