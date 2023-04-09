<?php

use App\Http\Controllers\Geral\Usuarios\UsuariosController;
use Illuminate\Support\Facades\Route;

Route::name('geral.usuarios.')
    ->prefix('geral/usuarios')
    ->group(function () {
        Route::post('set-ultimo-login', [UsuariosController::class, 'setUltimoLogin'])
            ->name('set-ultimo-login');

        Route::post('usuarios-online', [UsuariosController::class, 'usuariosOnline'])
            ->name('usuarios-online');
    });
