<?php

use App\Http\Controllers\Consultor\Produtos\ProdutosController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.consultores'])
    ->name('consultor.')
    ->prefix('consultor')
    ->group(function () {
        Route::resource('produtos', ProdutosController::class);
        Route::get('produto/get-produtos', [ProdutosController::class, 'produtos'])->name('produtos.get-produtos');
    });
