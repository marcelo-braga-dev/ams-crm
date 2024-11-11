<?php

use App\Http\Controllers\Geral\Leads\HistoricoContatoLead;
use Illuminate\Support\Facades\Route;

Route::name('auth.leads.')
    ->prefix('leads-historico-contato')
    ->group(function () {
        Route::get('get-historico-contato/{id}', [HistoricoContatoLead::class, 'getHistorico'])->name('get-historico-contato');
        Route::post('set-anotacao-contato/{id}', [HistoricoContatoLead::class, 'setAnotacao'])->name('set-anotacao-contato');
    });
