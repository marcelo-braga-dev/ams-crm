<?php

use App\Http\Controllers\Admin\Financeiro\FaturamentoController;
use App\Http\Controllers\Admin\Financeiro\FluxoCaixaConfigController;
use App\Http\Controllers\Admin\Financeiro\FluxoCaixaController;
use App\Http\Controllers\Admin\Financeiro\SalariosController;
use Illuminate\Support\Facades\Route;

Route::name('admin.financeiro.')
    ->prefix('admin/financeiro')
    ->group(function () {
        Route::resource('fluxo-caixa', FluxoCaixaController::class);
        Route::resource('faturamento', FaturamentoController::class);

        Route::name('fluxo-caixa.')
            ->prefix('api')
            ->group(function () {
                Route::get('proximos-pagamentos', [FluxoCaixaController::class, 'getProximosPagamentos'])->name('proximos-pagamentos');
                Route::post('atualizar-pagamento', [FluxoCaixaController::class, 'setRealizarPagamento'])->name('atualizar-pagamento');
                Route::get('registros-filtrados', [FluxoCaixaController::class, 'getRegistrosFiltrados'])->name('registros-filtrados');
                Route::get('variaveis', [FluxoCaixaController::class, 'getVariaveis'])->name('variaveis');
            });

        Route::post('faturamento/remover-distribuidora', [FaturamentoController::class, 'removerNotaDistribuidora'])
            ->name('faturamento.remover-distribuidora');
        Route::post('faturamento/excluir-planilha', [FaturamentoController::class, 'excluirPLanilha'])
            ->name('faturamento.excluir-planilha');

        Route::resource('config', FluxoCaixaConfigController::class);
        Route::get('config-registros', [FluxoCaixaConfigController::class, 'registros'])->name('config-registros');

        Route::resource('salarios', SalariosController::class);
        Route::get('salarios-registros', [SalariosController::class, 'registros'])->name('salarios.registros');

        Route::post('faturamento_planilha', [FaturamentoController::class, 'planilha'])->name('faturamento.planilha');
        Route::post('atualizar-anotacao', [FaturamentoController::class, 'atualizarAnotacao'])->name('faturamento.atualizar-anotacao');
    });
