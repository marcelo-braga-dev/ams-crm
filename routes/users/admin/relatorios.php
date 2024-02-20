<?php

use App\Http\Controllers\Admin\MetasVendas\ComissoesController;
use App\Http\Controllers\Admin\MetasVendas\ConsultoresController;
use App\Http\Controllers\Admin\Relatorios\MetasVendasController;
use App\Http\Controllers\Admin\Relatorios\VendasController;
use Illuminate\Support\Facades\Route;

Route::name('admin.relatorios.')
    ->prefix('admin/relatorios')
    ->group(function () {
        Route::resource('vendas', VendasController::class);
        Route::resource('meta-vendas', MetasVendasController::class);
    });
