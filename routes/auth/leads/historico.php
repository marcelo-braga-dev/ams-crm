<?php

use App\Http\Controllers\Geral\Leads\GerenciarLeadsController;
use App\Http\Controllers\Geral\Leads\HistoricoLeadController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Leads\LeadsController;

Route::name('auth.leads.')
    ->prefix('auth/leads')
    ->group(function () {
        Route::resource('historico', HistoricoLeadController::class);

        Route::name('historico.api.')
            ->prefix('historico-api')
            ->group(function () {
                Route::get('get-histrico', [HistoricoLeadController::class, 'getHistorico'])->name('get-historico');
            });
    });
