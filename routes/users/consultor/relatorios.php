<?php

use App\Http\Controllers\Consultor\Relatorios\MetasController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.relatorios.')
    ->prefix('consultor/relatorios')
    ->group(function () {
        Route::resource('metas', MetasController::class);
    });
