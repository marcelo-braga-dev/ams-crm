<?php

use App\Http\Controllers\Consultor\Ferramentas\Tarefas\AprovacaoController;
use App\Http\Controllers\Consultor\Ferramentas\Tarefas\AtendimentoController;
use App\Http\Controllers\Consultor\Ferramentas\Tarefas\FinalizadoController;
use App\Http\Controllers\Consultor\Ferramentas\Tarefas\AbertoController;
use App\Http\Controllers\Consultor\Ferramentas\Tarefas\TaferasController;
use Illuminate\Support\Facades\Route;

Route::name('consultor.ferramentas.')
    ->prefix('consultor/ferramentas')
    ->group(function () {
        Route::resource('tarefas', TaferasController::class);

        Route::name('tarefas.')
            ->prefix('tarefas/status')
            ->group(function () {
                Route::resource('aberto', AbertoController::class);
                Route::resource('atendimento', AtendimentoController::class);
                Route::resource('aprovacao', AprovacaoController::class);
                Route::resource('finalizado', FinalizadoController::class);

                Route::put('alterar-status-item', [TaferasController::class, 'alterarStatusItem'])->name('alterar-status-item');
            });
    });
