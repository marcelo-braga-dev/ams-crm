<?php

use App\Http\Controllers\Supervisor\Notificacoes\NotificacoesController;
use App\Http\Controllers\Supervisor\Notificacoes\PedidosNotificacoesController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('notificacoes', NotificacoesController::class);

        Route::put('marcar-lidas', [NotificacoesController::class, 'marcarLidas'])
            ->name('notificacoes.marcar-lidas');
    });
