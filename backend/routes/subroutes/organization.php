<?php

use App\Http\Controllers\Organization\OrganizationController;
use App\Http\Controllers\Organization\AdminOrganizationController;
use App\Http\Controllers\Organization\UserOrganizationController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {

    Route::prefix('organization')->group(function () {

        //! Acciones generales
        // Listar las organizacion del usuario
        Route::get('/', [OrganizationController::class, 'index']);

        // Crear una nueva organizacion
        Route::post('/', [OrganizationController::class, 'store']);

        //! Usuario
        // Buscar una organizacion por codigo
        Route::get('/by-code/{code}', [UserOrganizationController::class, 'showByCode']);

        // Crear una solicitud de union a organización
        Route::post('{code}/join-request', [UserOrganizationController::class, 'store']);

        // Cancelar una solciitud de unión a organización
        Route::delete('{code}/join-request', [UserOrganizationController::class, 'cancel']);

        //! Administrador
        // Listar solciitudes pendientes
        Route::get('{organization}/join-requests', [AdminOrganizationController::class, 'index']);
        
        // Aprobar el ingreso de un usuario
        Route::post('{organization}/join-requests/{joinRequest}/approve', [AdminOrganizationController::class, 'approve']);
        
        // Rechazar el ingreso de un usuario
        Route::post('{organization}/join-requests/{joinRequest}/reject', [AdminOrganizationController::class, 'reject']);

        // Bloquear a usuario para que ya no mande solicitudes
        Route::post('{organization}/join-requests/{joinRequest}/block', [AdminOrganizationController::class, 'block']);

        // Editar permisos de la organizacion
    });
});
