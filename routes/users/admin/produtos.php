<?php

use App\Http\Controllers\Admin\Produtos\ProdutosController;
use Illuminate\Support\Facades\Route;

// Fornecedores
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resources([
            'produtos' => ProdutosController::class
        ]);
    });
