<?php

use App\Http\Controllers\Admin\Pedidos\ConfigController;
use App\Http\Controllers\Admin\Pedidos\EmitirPedidosController;
use App\Http\Controllers\Admin\Pedidos\HistoricoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\AcompanhamentoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\AguardandoFaturamentoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\AguardandoNotaController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\AguardandoPagamentoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\CanceladoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\ConferenciaController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\EntregueController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\FaturadoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\LancadoController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\ReprovadosController;
use App\Http\Controllers\Admin\Pedidos\Modelo1\RetrocederController;
use App\Http\Controllers\Admin\Pedidos\PedidosController;
use App\Http\Controllers\Admin\Pedidos\Quadros\PedidosQuadrosController;
use App\Http\Controllers\Admin\Pedidos\Relatorios\FaturamentoController;
use App\Http\Controllers\Admin\Pedidos\Relatorios\ProdutosController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin/pedido')
    ->group(function () {
        Route::get('pedidos-cards', [PedidosController::class, 'pedidos'])
            ->name('pedidos-cards');

        Route::resource('pedidos', PedidosController::class);
        Route::resource('reprovado', ReprovadosController::class);
        Route::resource('conferencia', ConferenciaController::class);
        Route::resource('lancado', LancadoController::class);
        Route::resource('aguardando-nota', AguardandoNotaController::class);
        Route::resource('aguardando-pagamento', AguardandoPagamentoController::class);
        Route::resource('aguardando-faturamento', AguardandoFaturamentoController::class);
        Route::resource('faturado', FaturadoController::class);
        Route::resource('acompanhamento', AcompanhamentoController::class);
        Route::resource('entregue', EntregueController::class);
        Route::resource('cancelado', CanceladoController::class);

        Route::resource('config', ConfigController::class);
        Route::resource('retroceder', RetrocederController::class);

        Route::resource('historico', HistoricoController::class);
    });

Route::name('admin.pedidos.relatorios.')
    ->prefix('admin/pedidos/relatorios')
    ->group(function () {
        Route::resource('produtos', ProdutosController::class);
        Route::resource('faturamento', FaturamentoController::class);

        Route::get('gerar-planilha', [ProdutosController::class, 'gerarPlanilha'])
            ->name('gerar-planilha');
    });

Route::name('admin.pedidos.')
    ->prefix('admin/pedidos')
    ->group(function () {
        Route::resource('quadros', PedidosQuadrosController::class);
        Route::resource('emitir', EmitirPedidosController::class);
        Route::post('buscar-produtos-fornecedor', [EmitirPedidosController::class, 'buscarProdutosFornecedor'])
            ->name('pedidos.buscar-produtos-fornecedor');

        Route::post('config-cores-pedidos', [ConfigController::class, 'atualizarCoresPedidos'])
            ->name('config-cores-pedidos');

        Route::post('gerar-planilha-pedidos', [PedidosController::class, 'gerarPlanilhaPedidos'])
            ->name('gerar-planilha-pedidos');
    });

Route::name('admin.modelo-2.pedidos.')
    ->prefix('admin/modelo-2/pedidos')
    ->group(function () {
        Route::resource('encomenda', \App\Http\Controllers\Admin\Pedidos\Modelo1\EncomendaController::class);
        Route::resource('lancado', \App\Http\Controllers\Admin\Pedidos\Modelo2\LancadoController::class);
        Route::resource('faturado', \App\Http\Controllers\Admin\Pedidos\Modelo2\FaturadoController::class);
    });
