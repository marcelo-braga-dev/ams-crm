<?php

use App\Http\Controllers\Consultor\Orcamentos\OrcamentosController;
use Illuminate\Support\Facades\Route;

Route::name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('orcamentos', OrcamentosController::class);

    });

Route::name('consultor.orcamentos.')
    ->prefix('consultor/orcamento')
    ->group(function () {
        Route::get('orcamento-pdf', [OrcamentosController::class, 'orcamentoPdf'])->name('orcamento-pdf');
        Route::get('buscar-geradores', [OrcamentosController::class, 'buscarGeradores'])->name('buscar-geradores');
    });
