<?php

use App\Http\Controllers\Geral\Pedidos\PedidosController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')
    ->prefix('pedidos')
    ->group(function () {
        Route::resource('pedidos', PedidosController::class);

        Route::name('pedidos.')
            ->prefix('pedido')
            ->group(function () {
                Route::post('add-anotacoes', [PedidosController::class, 'addAnotacoes'])->name('add-anotacoes');
            });
    });
