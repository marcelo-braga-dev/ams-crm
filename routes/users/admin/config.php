<?php

use App\Http\Controllers\Admin\Config\CategoriasController;
use Illuminate\Support\Facades\Route;

// Fornecedores
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.config.')
    ->prefix('admin')
    ->group(function () {
        Route::resources([
            'categorias' => CategoriasController::class
        ]);
    });
