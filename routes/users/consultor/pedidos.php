<?php

use App\Http\Controllers\Consultor\Pedidos\AguardandoPagamentoController;
use App\Http\Controllers\Consultor\Pedidos\FaturadoController;
use App\Http\Controllers\Consultor\Pedidos\HistoricoController;
use App\Http\Controllers\Consultor\Pedidos\RevisarController;
use App\Http\Controllers\Consultor\Pedidos\PedidosController;
use Illuminate\Support\Facades\Route;

// Pedidos
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor/pedido')
    ->group(function () {

        Route::resource('pedidos', PedidosController::class);
        Route::resource('revisar', RevisarController::class);
        Route::resource('aguardando-pagamento', AguardandoPagamentoController::class);
        Route::resource('faturado', FaturadoController::class);
        Route::resource('historicos', HistoricoController::class);
    });
