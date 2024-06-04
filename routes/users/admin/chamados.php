<?php

use App\Http\Controllers\Admin\Chamados\ChamadosController;
use App\Http\Controllers\Admin\Chamados\AbertoController;
use App\Http\Controllers\Admin\Chamados\AtendimentoController;
use App\Http\Controllers\Admin\Chamados\FinalizadoController;

use Illuminate\Support\Facades\Route;

// SAC
Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('chamados', ChamadosController::class);
    });

Route::name('admin.chamado.')
    ->prefix('admin/chamado')
    ->group(function () {
        Route::resource('aberto', AbertoController::class);
        Route::resource('atendimento', AtendimentoController::class);
        Route::resource('finalizado', FinalizadoController::class);

        Route::post('aberto', [AbertoController::class, 'avancarStatus'])->name('aberto.avancar');
        Route::post('atendimento', [AtendimentoController::class, 'avancarStatus'])->name('atendimento.avancar');
        Route::post('finalizado', [FinalizadoController::class, 'avancarStatus'])->name('finalizado.avancar');
    });


