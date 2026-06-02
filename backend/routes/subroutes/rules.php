<?php

use App\Http\Controllers\BusinessRule\BusinessRuleController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->prefix('organization/{orgSlug}')->group(function () {
    
    //! Reglas de Negocio
    // Listar las reglas de negocio de la organización
    Route::get('rules', [BusinessRuleController::class, 'index']);
    
    // Crear una nueva regla de negocio
    Route::post('rules', [BusinessRuleController::class, 'store']);
    
    // Actualizar parcialmente una regla de negocio existente
    Route::patch('rules/{rule}', [BusinessRuleController::class, 'update']);
    
    // Eliminar una regla de negocio
    Route::delete('rules/{rule}', [BusinessRuleController::class, 'destroy']);
    
    // Alternar el estado (activar/desactivar) de una regla de negocio
    Route::patch('rules/{rule}/toggle', [BusinessRuleController::class, 'toggle']);
    
});
