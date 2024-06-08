<?php

use App\Http\Controllers\Admin\Pedidos\Relatorios\VendasController;
use App\Http\Controllers\Admin\Relatorios\MetasVendasController;
use Illuminate\Support\Facades\Route;

Route::name('admin.relatorios.')
    ->prefix('admin/relatorios')
    ->group(function () {
        Route::resource('vendas', VendasController::class);
        Route::resource('meta-vendas', MetasVendasController::class);
    });
