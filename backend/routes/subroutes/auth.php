<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

Route::prefix('auth/register')->group(function () {
    Route::post('/start', [RegisterController::class, 'start']);
    Route::post('/verify', [RegisterController::class, 'verify']);
    Route::post('/resend', [RegisterController::class, 'resend']);
    Route::post('/complete', [RegisterController::class, 'complete']);
});


Route::post('/auth/login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('/auth/me', [LoginController::class, 'me']);
