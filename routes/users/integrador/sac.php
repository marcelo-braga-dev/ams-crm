<?php

use Illuminate\Support\Facades\Route;

Route::name('integrador.')
    ->prefix('integrador')
    ->group(function () {
        Route::resource('sac', \App\Http\Controllers\Integrador\Sac\SacController::class);
    });
