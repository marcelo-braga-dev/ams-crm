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

        Route::post('faturamento/remover-distribuidora', [FaturamentoController::class, 'removerNotaDistribuidora'])
            ->name('faturamento.remover-distribuidora');
        Route::post('faturamento/excluir-planilha', [FaturamentoController::class, 'excluirPLanilha'])
            ->name('faturamento.excluir-planilha');

        Route::post('fluxo-caixa-alterar-status', [FluxoCaixaController::class, 'alterarStatus'])
            ->name('fluxo-caixa.alterar-status');
        Route::put('fluxo-caixa-alterar-baixa/{id}', [FluxoCaixaController::class, 'alterarBaixa'])
            ->name('fluxo-caixa.atualizar-baixa');
        Route::get('registros', [FluxoCaixaController::class, 'registros'])->name('registros');

        Route::resource('config', FluxoCaixaConfigController::class);
        Route::get('config-registros', [FluxoCaixaConfigController::class, 'registros'])->name('config-registros');

        Route::resource('salarios', SalariosController::class);
        Route::get('salarios-registros', [SalariosController::class, 'registros'])->name('salarios.registros');

        Route::post('faturamento_planilha', [FaturamentoController::class, 'planilha'])->name('faturamento.planilha');
        Route::post('atualizar-anotacao', [FaturamentoController::class, 'atualizarAnotacao'])->name('faturamento.atualizar-anotacao');
    });
