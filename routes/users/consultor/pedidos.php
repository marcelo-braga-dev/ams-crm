<?php

use App\Http\Controllers\Consultor\Pedidos\FaturadoController;
use App\Http\Controllers\Consultor\Pedidos\HistoricoController;
use App\Http\Controllers\Consultor\Pedidos\PedidosController;
use App\Http\Controllers\Consultor\Pedidos\Status\AcompanhamentoController;
use App\Http\Controllers\Consultor\Pedidos\Status\AguardandoPagamentoController;
use App\Http\Controllers\Consultor\Pedidos\Status\RevisarController;
use Illuminate\Support\Facades\Route;

// MODELO 1
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor/pedido')
    ->group(function () {

        Route::resource('pedidos', PedidosController::class);
        Route::resource('revisar', RevisarController::class);
        Route::resource('aguardando-pagamento', AguardandoPagamentoController::class);
        Route::resource('faturado', FaturadoController::class);
        Route::resource('acompanhamento', AcompanhamentoController::class);

        Route::resource('historicos', HistoricoController::class);

        Route::post('faturado-atualizar-status', [FaturadoController::class, 'atualizarStatus'])->name('pedidos.atualizar-status');
        Route::post('buscar-produtos-fornecedor', [PedidosController::class, 'buscarProdutosFornecedor'])
            ->name('pedidos.buscar-produtos-fornecedor');
    });

// MODELO 2
Route::name('consultor.pedidos.modelo-2.')
    ->prefix('consultor/pedidos/modelo-2')
    ->group(function () {
        Route::resource('faturado', \App\Http\Controllers\Consultor\Pedidos\Modelo2\FaturadoController::class);
    });
