<?php

use App\Http\Controllers\Consultor\Chamados\AbertoController;
use App\Http\Controllers\Consultor\Chamados\AtendimentoController;
use App\Http\Controllers\Consultor\Chamados\FinalizadoController;
use App\Http\Controllers\Consultor\Chamados\ChamadosController;
use App\Http\Controllers\Consultor\Chamados\PedidoChamadosController;
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
        Route::resource('aberto', AbertoController::class);
        Route::resource('atendimento', AtendimentoController::class);
        Route::resource('finalizado', FinalizadoController::class);
        Route::resource('pedido', PedidoChamadosController::class);

        Route::post('aberto', [AbertoController::class, 'avancarStatus'])->name('aberto.avancar');
        Route::post('atendimento', [AtendimentoController::class, 'avancarStatus'])->name('atendimento.avancar');
        Route::post('finalizado', [FinalizadoController::class, 'avancarStatus'])->name('finalizado.avancar');
    });
