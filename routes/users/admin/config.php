<?php

use App\Http\Controllers\Admin\Config\PlataformaController;
use App\Http\Controllers\Admin\Config\SetoresController;
use Illuminate\Support\Facades\Route;

// Fornecedores
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.config.')
    ->prefix('admin')
    ->group(function () {
        Route::resources([
            'categorias' => SetoresController::class,
            'plataforma' => PlataformaController::class
        ]);
    });
