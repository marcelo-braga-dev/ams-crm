<?php

use App\Http\Controllers\Admin\MetasVendas\ConsultoresController;
use App\Http\Controllers\Admin\MetasVendas\VendasFaturadasController;
use Illuminate\Support\Facades\Route;

Route::name('admin.metas-vendas.')
    ->prefix('admin/metas-vendas')
    ->group(function () {
        Route::resource('consultores', ConsultoresController::class);
        Route::resource('vendas-faturadas', VendasFaturadasController::class);
    });
