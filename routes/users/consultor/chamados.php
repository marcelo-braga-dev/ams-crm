<?php

use App\Http\Controllers\Consultor\Chamados\ChamadosController;
use App\Http\Controllers\Consultor\Chamados\NovoController;
use App\Http\Controllers\Consultor\Chamados\RespostasController;
use Illuminate\Support\Facades\Route;

// Chamados
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('chamados', ChamadosController::class);
    });
// Chamado Status
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.chamado.')
    ->prefix('consultor/chamado')
    ->group(function () {
        Route::resource('novo', NovoController::class);
        Route::resource('responder', RespostasController::class);
    });
