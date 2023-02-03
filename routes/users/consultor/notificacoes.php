<?php

use App\Http\Controllers\Consultor\Notificacoes\LeadsNotificacoesController;
use App\Http\Controllers\Consultor\Notificacoes\PedidosNotificacoesController;
use Illuminate\Support\Facades\Route;

//Clientes
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.notificacoes.')
    ->prefix('consultor/notificacoes')
    ->group(function () {
        Route::resource('pedidos', PedidosNotificacoesController::class);
        Route::resource('leads', LeadsNotificacoesController::class);
    });
