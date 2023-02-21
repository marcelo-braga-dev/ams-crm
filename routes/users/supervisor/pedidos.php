<?php

use App\Http\Controllers\Supervisor\Pedidos\ConfigController;
use App\Http\Controllers\Supervisor\Pedidos\HistoricoController;
use App\Http\Controllers\Supervisor\Pedidos\PedidosController;
use App\Http\Controllers\Supervisor\Pedidos\Status\AguardandoFaturamentoController;
use App\Http\Controllers\Supervisor\Pedidos\Status\AguardandoNotaController;
use App\Http\Controllers\Supervisor\Pedidos\Status\AguardandoPagamentoController;
use App\Http\Controllers\Supervisor\Pedidos\Status\CanceladoController;
use App\Http\Controllers\Supervisor\Pedidos\Status\ConferenciaController;
use App\Http\Controllers\Supervisor\Pedidos\Status\EntregueController;
use App\Http\Controllers\Supervisor\Pedidos\Status\FaturadoController;
use App\Http\Controllers\Supervisor\Pedidos\Status\LancadoController;
use App\Http\Controllers\Supervisor\Pedidos\Status\RetrocederController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.')
    ->prefix('supervisor/pedido')
    ->group(function () {
        Route::resource('pedidos', PedidosController::class);
    });

Route::name('supervisor.pedidos.')
    ->prefix('supervisor/pedidos')
    ->group(function () {
        Route::resources([
            'conferencia' => ConferenciaController::class,
            'lancado' => LancadoController::class,
            'aguardando-nota' => AguardandoNotaController::class,
            'aguardando-pagamento' => AguardandoPagamentoController::class,
            'aguardando-faturamento' => AguardandoFaturamentoController::class,
            'faturado' => FaturadoController::class,
            'entregue' => EntregueController::class,
            'cancelado' => CanceladoController::class,
            'retroceder' => RetrocederController::class,
            'config' => ConfigController::class,
            'historicos' => HistoricoController::class
        ]);
    });
