<?php

use App\Http\Controllers\Consultor\Agenda\CalendarioController;
use Illuminate\Support\Facades\Route;

Route::name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('agenda', CalendarioController::class);
    });
