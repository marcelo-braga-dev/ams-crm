<?php

use App\Http\Controllers\Integrador\Pedidos\HistoricoPedidosController;
use App\Http\Controllers\Integrador\Pedidos\PedidosInstalacaoController;
use Illuminate\Support\Facades\Route;

Route::name('integrador.pedidos.')
    ->prefix('integrador/pedido')
    ->group(function () {
        Route::resource('pedido', \App\Http\Controllers\Integrador\Pedidos\PedidosController::class);
        Route::resource('pedido-instalacao', PedidosInstalacaoController::class);
        Route::resource('historico', HistoricoPedidosController::class);
        Route::get('api-historico', [HistoricoPedidosController::class, 'getHistorico'])->name('api-historico');

        Route::name('instalacao.')
            ->prefix('')
            ->group(function () {
                Route::post('enviar-instalacao', [PedidosInstalacaoController::class, 'enviarParaInstalacao'])->name('enviar-instalacao');
            });
    });
