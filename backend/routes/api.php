<?php

use App\Http\Controllers\Api\Admin\AuthController;
use App\Http\Controllers\Api\Admin\CertificateAdminController;
use App\Http\Controllers\Api\CertificateController;
use Illuminate\Support\Facades\Route;

Route::get('/certificates/{serial}', [CertificateController::class, 'verify']);
Route::post('/certificates/lookup', [CertificateController::class, 'lookup']);

Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::get('/stats', [CertificateAdminController::class, 'stats']);
        Route::apiResource('certificates', CertificateAdminController::class);
    });
});
