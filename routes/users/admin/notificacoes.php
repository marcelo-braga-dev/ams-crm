<?php

use App\Http\Controllers\Admin\Notificacoes\NotificacoesController;
use Illuminate\Support\Facades\Route;

Route::name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('notificacoes', NotificacoesController::class);
    });
