<?php

use App\Http\Controllers\Geral\Leads\Api\EncaminharLeadController;
use App\Http\Controllers\Geral\Leads\Api\UpdateFinalizarLeadController;
use App\Http\Controllers\Geral\Leads\Api\UpdateContatoLeadController;
use Illuminate\Support\Facades\Route;

Route::name('auth.leads.api.')
    ->prefix('auth/leads-api')
    ->group(function () {
        Route::post('finalizar', UpdateFinalizarLeadController::class)->name('finalizar');
        Route::post('encaminhar', EncaminharLeadController::class)->name('encaminhar');

        Route::post('update-contato', UpdateContatoLeadController::class)->name('update-contato');
    });
