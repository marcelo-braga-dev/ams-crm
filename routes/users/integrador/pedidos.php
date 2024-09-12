<?php

use Illuminate\Support\Facades\Route;

Route::name('integrador.pedidos.')
    ->prefix('integrador/pedido')
    ->group(function () {
        Route::resource('pedido', \App\Http\Controllers\Integrador\Pedidos\PedidosController::class);
        Route::resource('pedido-instalacao', \App\Http\Controllers\Integrador\Pedidos\PedidosInstalacaoController::class);
    });
