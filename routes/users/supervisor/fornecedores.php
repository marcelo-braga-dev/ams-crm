<?php

use App\Http\Controllers\Supervisor\Fornecedores\FornecedoresController;
use Illuminate\Support\Facades\Route;

// Fornecedores
Route::name('supervisor.')
    ->prefix('supervisor')
    ->group(function () {
        Route::resource('fornecedores', FornecedoresController::class);
    });
