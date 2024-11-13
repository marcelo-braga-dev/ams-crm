<?php

use App\Http\Controllers\Geral\Pedidos\PedidosController;
use App\Http\Controllers\Geral\Perfil\PerfilController;
use App\Http\Controllers\Geral\Perfil\UpdateAvatarController;
use App\Http\Controllers\Geral\Perfil\UpdateSenhaUsuarioController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')
    ->prefix('auth')
    ->group(function () {
        Route::resource('perfil', PerfilController::class);
        Route::put('perfil-api/atualizar-senha', UpdateSenhaUsuarioController::class)->name('perfil.atualizar-senha');
        Route::put('perfil-api/atualizar-avatar', UpdateAvatarController::class)->name('perfil.atualizar-avatar');
    });
