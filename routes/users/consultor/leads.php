<?php

use App\Http\Controllers\Consultor\Leads\AtendimentoController;
use App\Http\Controllers\Consultor\Leads\AtivoController;
use App\Http\Controllers\Consultor\Leads\CanceladosController;
use App\Http\Controllers\Consultor\Leads\FinalizadosController;
use App\Http\Controllers\Consultor\Leads\LeadsController;
use App\Http\Controllers\Consultor\Leads\NovoController;
use Illuminate\Support\Facades\Route;

// Leads
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.leads.')
    ->prefix('consultor/leads')
    ->group(function () {
        Route::resources([
            'main' => LeadsController::class,
            'atendimento' => AtendimentoController::class,
            'ativo' => AtivoController::class,
            'novo' => NovoController::class,
            'finalizado' => FinalizadosController::class,
            'cancelado' => CanceladosController::class
        ]);

        Route::post('update-classificacao', [LeadsController::class, 'updateClassificacao'])
            ->name('update-classificacao');
    });
