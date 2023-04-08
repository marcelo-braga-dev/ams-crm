<?php

use App\Http\Controllers\Supervisor\Perfil\PerfilController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.perfil.')
    ->prefix('supervisor/perfil')
    ->group(function () {
        Route::resource('config', PerfilController::class);
        Route::put('alterar-senha/{id}', [PerfilController::class, 'alterarSenha'])
            ->name('alterar-senha');
    });
