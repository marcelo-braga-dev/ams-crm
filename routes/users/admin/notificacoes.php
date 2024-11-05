<?php

use App\Http\Controllers\Admin\Notificacoes\NotificacoesController;
use App\Http\Controllers\Admin\Notificacoes\PedidosNotificacoesController;
use App\Http\Controllers\Admin\Notificacoes\SacNotificacoesController;
use Illuminate\Support\Facades\Route;

Route::name('admin.notificacoes.')
    ->prefix('admin/notificacoes')
    ->group(function () {
        Route::resource('status', NotificacoesController::class);
        Route::resource('pedidos', PedidosNotificacoesController::class);
        Route::resource('sac', SacNotificacoesController::class);

        Route::put('marcar-lidas', [PedidosNotificacoesController::class, 'marcarLidas'])
            ->name('notificacoes.marcar-lidas');
    });
