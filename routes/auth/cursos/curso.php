<?php

use App\Http\Controllers\Geral\Cursos\CursosController;
use Illuminate\Support\Facades\Route;

Route::name('auth.cursos.')
    ->prefix('cursos')
    ->group(function () {
        Route::resource('curso', CursosController::class);

        Route::get('modulo/aulas', [CursosController::class, 'aulas'])->name('modulo.aulas');
    });
