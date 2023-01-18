<?php

use App\Http\Controllers\Supervisor\Usuarios\Admin\AdminController;
use App\Http\Controllers\Supervisor\Usuarios\Consultor\ConsultoresController;
use App\Http\Controllers\Supervisor\Usuarios\Supervisor\SupervisoresController;
use App\Http\Controllers\Supervisor\Usuarios\UsuariosController;
use Illuminate\Support\Facades\Route;

// Usuarios
Route::name('supervisor.usuarios.')
    ->prefix('supervisor/usuarios')
    ->group(function () {
        Route::resource('usuario', UsuariosController::class);
        Route::resource('consultores', ConsultoresController::class);
        Route::resource('supervisores', SupervisoresController::class);
        Route::resource('admins', AdminController::class);
    });
