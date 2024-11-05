<?php

use App\Http\Controllers\Geral\Pedidos\PedidosController;
use App\Http\Controllers\Geral\Perfil\PerfilController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')
    ->prefix('auth')
    ->group(function () {
        Route::resource('perfil', PerfilController::class);
    });
