<?php

use App\Http\Controllers\Admin\Notificacoes\PedidosNotificacoesController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('notificacoes', PedidosNotificacoesController::class);

        Route::put('marcar-lidas', [PedidosNotificacoesController::class, 'marcarLidas'])
            ->name('notificacoes.marcar-lidas');
    });
