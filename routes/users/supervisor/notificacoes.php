<?php

use App\Http\Controllers\Supervisor\Notificacoes\NotificacoesController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('notificacoes', NotificacoesController::class);
    });
