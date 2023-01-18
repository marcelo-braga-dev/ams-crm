<?php

use App\Http\Controllers\Consultor\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

//Clientes
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor/cliente')
    ->group(function () {
        Route::resource('clientes', LeadsController::class);
    });
