<?php

use App\Http\Controllers\Consultor\Agenda\CalendarioController;
use Illuminate\Support\Facades\Route;

Route::name('consultor.calendario.')
    ->prefix('consultor/calendario')
    ->group(function () {
        Route::resource('agenda', CalendarioController::class);
        Route::post('registros', [CalendarioController::class, 'registros'])->name('registros');
        Route::post('alterar-status', [CalendarioController::class, 'alterarStatus'])->name('alterar-status');
    });
