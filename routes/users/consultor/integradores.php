<?php

use App\Http\Controllers\Consultor\Integradores\IntegradoresController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor/')
    ->group(function () {
        Route::resource('integradores', IntegradoresController::class);
    });
