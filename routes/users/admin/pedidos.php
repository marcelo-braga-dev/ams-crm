<?php

use App\Http\Controllers\Admin\Pedidos\ConfigController;
use App\Http\Controllers\Admin\Pedidos\HistoricoController;
use App\Http\Controllers\Admin\Pedidos\PedidosController;
use App\Http\Controllers\Admin\Pedidos\Status\AguardandoFaturamentoController;
use App\Http\Controllers\Admin\Pedidos\Status\AguardandoNotaController;
use App\Http\Controllers\Admin\Pedidos\Status\AguardandoPagamentoController;
use App\Http\Controllers\Admin\Pedidos\Status\CanceladoController;
use App\Http\Controllers\Admin\Pedidos\Status\ConferenciaController;
use App\Http\Controllers\Admin\Pedidos\Status\EntregueController;
use App\Http\Controllers\Admin\Pedidos\Status\FaturadoController;
use App\Http\Controllers\Admin\Pedidos\Status\LancadoController;
use App\Http\Controllers\Admin\Pedidos\Status\RetrocederController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin/pedido')
    ->group(function () {
        Route::resource('pedidos', PedidosController::class);
        Route::resource('conferencia', ConferenciaController::class);
        Route::resource('lancado', LancadoController::class);
        Route::resource('aguardando-nota', AguardandoNotaController::class);
        Route::resource('aguardando-pagamento', AguardandoPagamentoController::class);
        Route::resource('aguardando-faturamento', AguardandoFaturamentoController::class);
        Route::resource('faturado', FaturadoController::class);
        Route::resource('entregue', EntregueController::class);
        Route::resource('cancelado', CanceladoController::class);

        Route::resource('config', ConfigController::class);
        Route::resource('retroceder', RetrocederController::class);

        Route::resource('historico', HistoricoController::class);
    });
