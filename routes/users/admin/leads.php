<?php

use App\Http\Controllers\Admin\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('leads', LeadsController::class);
    });
