<?php
declare(strict_types=1);

require dirname(__DIR__) . '/bootstrap.php';
rate_limit('chats_upload', 20, 300);

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TO_EXT = [
    'image/jpeg' => 'jpg',
    'image/png' => 'png',
    'image/gif' => 'gif',
    'image/webp' => 'webp',
    'application/pdf' => 'pdf',
];

if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
    json_response(['error' => 'missing_file'], 422);
}

if ($_FILES['file']['size'] <= 0 || $_FILES['file']['size'] > MAX_UPLOAD_BYTES) {
    json_response(['error' => 'file_too_large'], 422);
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime = finfo_file($finfo, $_FILES['file']['tmp_name']);
finfo_close($finfo);

if (!isset(ALLOWED_MIME_TO_EXT[$mime])) {
    json_response(['error' => 'unsupported_file_type'], 422);
}

$baseDir = dirname(__DIR__, 2) . '/uploads/chat';
if (!is_dir($baseDir) && !mkdir($baseDir, 0755, true) && !is_dir($baseDir)) {
    json_response(['error' => 'upload_dir_failed'], 500);
}

// Executable protection and directory-listing protection for the upload
// directory, written on first use. Without "Options -Indexes", anyone could
// browse this folder and download every file any visitor ever uploaded.
$htaccess = $baseDir . '/.htaccess';
if (!file_exists($htaccess)) {
    file_put_contents($htaccess, "Options -Indexes\nphp_flag engine off\nRemoveHandler .php .phtml .php3 .php4 .php5 .php7\nRemoveType .php .phtml .php3 .php4 .php5 .php7\n");
}

$ext = ALLOWED_MIME_TO_EXT[$mime];
$safeName = uniqid('chat_', true) . '.' . $ext;
$target = $baseDir . '/' . $safeName;

if (!move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
    json_response(['error' => 'upload_failed'], 500);
}

json_response([
    'ok' => true,
    'url' => public_upload_url('uploads/chat/' . $safeName),
    'name' => basename((string)$_FILES['file']['name']),
]);
