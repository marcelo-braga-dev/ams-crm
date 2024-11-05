<?php

use App\Http\Controllers\Admin\Dev\AprovandoController;
use App\Http\Controllers\Admin\Dev\DevController;
use App\Http\Controllers\Admin\Dev\AndamentoController;
use App\Http\Controllers\Admin\Dev\NovoController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('dev', DevController::class);
        Route::resource('dev-novo', NovoController::class);
        Route::resource('dev-andamento', AndamentoController::class);
        Route::resource('dev-aprovando', AprovandoController::class);
    });
