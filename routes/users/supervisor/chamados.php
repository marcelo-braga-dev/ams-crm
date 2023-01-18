<?php

use App\Http\Controllers\Supervisor\Chamados\ChamadosController;
use Illuminate\Support\Facades\Route;

// SAC
Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('chamados', ChamadosController::class);
    });


