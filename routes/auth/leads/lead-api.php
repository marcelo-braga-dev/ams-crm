<?php

use App\Http\Controllers\Geral\Leads\Api\EncaminharLeadController;
use App\Http\Controllers\Geral\Leads\Api\SetFinalizarLeadController;
use Illuminate\Support\Facades\Route;

Route::name('auth.leads.api.')
    ->prefix('auth/leads-api')
    ->group(function () {
        Route::post('finalizar', SetFinalizarLeadController::class)->name('finalizar');
        Route::post('encaminhar', EncaminharLeadController::class)->name('encaminhar');
    });
