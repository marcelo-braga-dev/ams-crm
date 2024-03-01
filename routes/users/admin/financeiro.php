<?php

use App\Http\Controllers\Admin\Financeiro\FluxoCaixaConfigController;
use App\Http\Controllers\Admin\Financeiro\FluxoCaixaController;
use App\Http\Controllers\Admin\Financeiro\SalariosController;
use Illuminate\Support\Facades\Route;

Route::name('admin.financeiro.')
    ->prefix('admin/financeiro')
    ->group(function () {
        Route::resource('fluxo-caixa', FluxoCaixaController::class);
        Route::post('fluxo-caixa-alterar-status', [FluxoCaixaController::class, 'alterarStatus'])
            ->name('fluxo-caixa.alterar-status');
        Route::put('fluxo-caixa-alterar-baixa/{id}', [FluxoCaixaController::class, 'alterarBaixa'])
            ->name('fluxo-caixa.atualizar-baixa');

        Route::resource('config', FluxoCaixaConfigController::class);
        Route::resource('salarios', SalariosController::class);
        Route::get('salarios-dados', [SalariosController::class, 'salariosMensais'])->name('salarios.mensais');
    });
