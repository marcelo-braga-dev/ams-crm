<?php

use App\Http\Controllers\Admin\Dev\DevController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('dev', DevController::class);
    });
