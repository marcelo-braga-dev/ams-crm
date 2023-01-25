<?php

use App\Http\Controllers\Supervisor\Chamados\ChamadosController;
use App\Http\Controllers\Supervisor\Chamados\ChamadosPedidoController;
use Illuminate\Support\Facades\Route;

// SAC
Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('chamados', ChamadosController::class);
    });

Route::name('supervisor.')
    ->prefix('supervisor/chamados')
    ->group(function () {
        Route::resource('chamado', ChamadosController::class);
    });

Route::name('supervisor.chamados.')
    ->prefix('supervisor/chamados')
    ->group(function () {
        Route::resource('pedido', ChamadosPedidoController::class);
    });


