<?php

use Illuminate\Support\Facades\Route;

Route::name('integrador.graus-vantagem.')
    ->prefix('integrador/graus-vantagem')
    ->group(function () {
        Route::resource('graus', \App\Http\Controllers\Integrador\GrausVantagem\GrausVantagemController::class);
    });
