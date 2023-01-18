<?php

use App\Http\Controllers\Admin\Fornecedores\FornecedoresController;
use Illuminate\Support\Facades\Route;

// Fornecedores
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('fornecedores', FornecedoresController::class);
    });
