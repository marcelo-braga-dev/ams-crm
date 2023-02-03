<?php

use App\Http\Controllers\Supervisor\Pedidos\AguardandoFaturamentoController;
use App\Http\Controllers\Supervisor\Pedidos\AguardandoNotaController;
use App\Http\Controllers\Supervisor\Pedidos\AguardandoPagamentoController;
use App\Http\Controllers\Supervisor\Pedidos\CanceladoController;
use App\Http\Controllers\Supervisor\Pedidos\ConferenciaController;
use App\Http\Controllers\Supervisor\Pedidos\ConfigController;
use App\Http\Controllers\Supervisor\Pedidos\EntregueController;
use App\Http\Controllers\Supervisor\Pedidos\FaturadoController;
use App\Http\Controllers\Supervisor\Pedidos\LancadoController;
use App\Http\Controllers\Supervisor\Pedidos\PedidosController;
use App\Http\Controllers\Supervisor\Pedidos\RetrocederController;
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
            'config' => ConfigController::class
        ]);
    });
