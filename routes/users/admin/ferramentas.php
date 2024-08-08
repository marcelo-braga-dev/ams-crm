<?php

use App\Http\Controllers\Admin\Ferramentas\Tarefas\AprovacaoController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\AtendimentoController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\FinalizadoController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\TaferasController;
use App\Http\Controllers\Admin\Ferramentas\Tarefas\AbertoController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.ferramentas.')
    ->prefix('admin/ferramentas')
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
