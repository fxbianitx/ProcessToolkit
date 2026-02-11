<?php

use App\Http\Controllers\BusinessRule\BusinessRuleController;
use Illuminate\Support\Facades\Route;

Route::post('/business-rules', [BusinessRuleController::class, 'store']);
