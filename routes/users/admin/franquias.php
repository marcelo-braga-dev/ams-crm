<?php

use App\Http\Controllers\Admin\Franquias\FranquiasController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('franquias', FranquiasController::class);
    });
