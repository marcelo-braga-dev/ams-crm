<?php

use App\Http\Controllers\Supervisor\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('leads', LeadsController::class);
    });
