<?php

use App\Http\Controllers\Admin\Chamados\ChamadosController;
use App\Http\Controllers\Admin\Chamados\ChamadosPedidoController;
use Illuminate\Support\Facades\Route;

// SAC
Route::name('admin.')
    ->prefix('admin/chamados')
    ->group(function () {
        Route::resource('chamado', ChamadosController::class);
    });

Route::name('admin.chamados.')
    ->prefix('admin/chamados')
    ->group(function () {
        Route::resource('pedido', ChamadosPedidoController::class);
    });


