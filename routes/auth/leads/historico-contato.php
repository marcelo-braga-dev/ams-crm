<?php

use App\Http\Controllers\Geral\Leads\GetHistoricoContatoLead;
use Illuminate\Support\Facades\Route;

Route::name('auth.leads.')
    ->prefix('leads-historico-contato')
    ->group(function () {
        Route::get('get-historico-contato/{id}', [GetHistoricoContatoLead::class, 'getHistorico'])->name('get-historico-contato');
    });
