<?php

use App\Http\Controllers\Admin\Perfil\PerfilController;
use Illuminate\Support\Facades\Route;

Route::name('admin.perfil.')
    ->prefix('admin/perfil')
    ->group(function () {
        Route::resource('config', PerfilController::class);
        Route::put('alterar-senha/{id}', [PerfilController::class, 'alterarSenha'])
            ->name('alterar-senha');
    });
