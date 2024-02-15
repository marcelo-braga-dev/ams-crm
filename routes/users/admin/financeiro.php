<?php

use App\Http\Controllers\Admin\Financeiro\FluxoCaixaConfigController;
use App\Http\Controllers\Admin\Financeiro\FluxoCaixaController;
use Illuminate\Support\Facades\Route;

Route::name('admin.financeiro.')
    ->prefix('admin/financeiro')
    ->group(function () {
        Route::resource('fluxo-caixa', FluxoCaixaController::class);
        Route::post('fluxo-caixa-alterar-status', [FluxoCaixaController::class, 'alterarStatus'])
            ->name('fluxo-caixa.alterar-status');

        Route::resource('config', FluxoCaixaConfigController::class);
    });
