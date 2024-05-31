<?php

use App\Http\Controllers\Geral\PinsController;
use Illuminate\Support\Facades\Route;

Route::name('geral.pins.')
    ->prefix('geral/pins')
    ->group(function () {
        Route::post('pedidos', [PinsController::class, 'pedidos'])->name('pedidos');
        Route::post('leads', [PinsController::class, 'leads'])->name('leads');
    });
