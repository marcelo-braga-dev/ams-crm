<?php

use App\Http\Controllers\Geral\Sac\SacController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')
    ->prefix('auth')
    ->group(function () {
        Route::resource('sac', SacController::class);
    });
