<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return '<div style="padding: 20px; font-family: Arial;">
                <h1>¡Hola! Docker con Laravel funciona 🚀</h1>
                <p>Fecha y hora del servidor: ' . now() . '</p>
                <p>PHP Version: ' . PHP_VERSION . '</p>
                <p>Laravel Version: ' . app()->version() . '</p>
            </div>';
});

Route::get('/api/test', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API funcionando correctamente 🚀',
        'server_time' => now()->toDateTimeString(),
        'php_version' => PHP_VERSION,
        'laravel_version' => app()->version(),
    ]);
});

Route::get('/ping', fn () => 'pong');
