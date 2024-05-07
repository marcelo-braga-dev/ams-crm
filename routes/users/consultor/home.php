<?php

use App\Http\Controllers\Consultor\Home\HomeController as HomeHomeController;
use App\Http\Controllers\Home\HomeController;
use Illuminate\Support\Facades\Route;

Route::name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('home', HomeHomeController::class);
    });
