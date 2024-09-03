<?php

use App\Http\Controllers\Geral\Pedidos\PedidosController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')
    ->prefix('pedidos')
    ->group(function () {
        Route::resource('pedidos', PedidosController::class);
    });
