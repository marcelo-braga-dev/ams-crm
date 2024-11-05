<?php

use App\Http\Controllers\Admin\Usuarios\Admin\AdminController;
use App\Http\Controllers\Admin\Usuarios\Consultor\ConsultoresController;
use App\Http\Controllers\Admin\Usuarios\Funcoes\FuncoesController;
use App\Http\Controllers\Admin\Usuarios\HistoricoOnline\HistoricoOnlineController;
use App\Http\Controllers\Admin\Usuarios\MigrarController;
use App\Http\Controllers\Admin\Usuarios\Supervisor\SupervisoresController;
use App\Http\Controllers\Admin\Usuarios\UsuariosController;
use Illuminate\Support\Facades\Route;

// Usuarios
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.usuarios.')
    ->prefix('admin/usuarios')
    ->group(function () {
        Route::resource('usuario', UsuariosController::class);
        Route::resource('consultores', ConsultoresController::class);
        Route::resource('supervisores', SupervisoresController::class);
        Route::resource('admins', AdminController::class);
        Route::resource('funcoes', FuncoesController::class);
        Route::put('update-senha/{id}', [UsuariosController::class, 'updateSenha'])->name('update-senha');

        Route::resource('migrar', MigrarController::class);
        Route::resource('historico-online', HistoricoOnlineController::class);
    });
