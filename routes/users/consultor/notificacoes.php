<?php

use App\Http\Controllers\Admin\Notificacoes\NotificacoesController;
use App\Http\Controllers\Consultor\Notificacoes\LeadsNotificacoesController;
use App\Http\Controllers\Consultor\Notificacoes\PedidosNotificacoesController;
use App\Http\Controllers\Consultor\Notificacoes\SacNotificacoesController;
use Illuminate\Support\Facades\Route;

//Clientes
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.notificacoes.')
    ->prefix('consultor/notificacoes')
    ->group(function () {
        Route::resource('status', NotificacoesController::class);

        Route::resource('pedidos', PedidosNotificacoesController::class);
        Route::resource('leads', LeadsNotificacoesController::class);
        Route::resource('sac', SacNotificacoesController::class);

        Route::put('marcar-lidas', [PedidosNotificacoesController::class, 'marcarLidas'])
            ->name('marcar-lidas');
        Route::put('sac/marcar-lidas', [SacNotificacoesController::class, 'marcarLidas'])
            ->name('sac.marcar-lidas');
    });
