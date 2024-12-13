<?php

use App\Http\Controllers\Geral\Leads\Api\EdicoesHistoricoController;
use App\Http\Controllers\Geral\Leads\HistoricoLeadController;
use Illuminate\Support\Facades\Route;

Route::name('auth.leads.')
    ->prefix('auth/leads')
    ->group(function () {
        Route::resource('historico', HistoricoLeadController::class);

        Route::name('historico.api.')
            ->prefix('historico-api')
            ->group(function () {
                Route::get('get-histrico', [HistoricoLeadController::class, 'getHistorico'])->name('get-historico');
                Route::get('get-histrico-edicoes/{id}', EdicoesHistoricoController::class)->name('get-histrico-edicoes');
            });
    });
