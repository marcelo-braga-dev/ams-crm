<?php

use App\Http\Controllers\Consultor\Perfil\PerfilController;
use App\Http\Controllers\Consultor\Perfil\SenhaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor/')
    ->group(function () {
        Route::resource('perfil', PerfilController::class);
        Route::resource('senha', SenhaController::class);
    });
