<?php

use App\Http\Controllers\Consultor\Notificacoes\NotificacoesController;
use Illuminate\Support\Facades\Route;

//Clientes
Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('notificacoes', NotificacoesController::class);
    });
