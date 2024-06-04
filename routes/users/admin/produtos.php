<?php

use App\Http\Controllers\Admin\Produtos\CategoriasController;
use App\Http\Controllers\Admin\Produtos\EstoqueLocalController;
use App\Http\Controllers\Admin\Produtos\EstoquesController;
use App\Http\Controllers\Admin\Produtos\EstoqueTransitoController;
use App\Http\Controllers\Admin\Produtos\ProdutosFornecedoresController;
use App\Http\Controllers\Admin\Produtos\UnidadesController;
use Illuminate\Support\Facades\Route;

// Produtos Fornecedores
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('produtos', \App\Http\Controllers\Admin\Produtos\ProdutosController::class);


        Route::resource('produtos-fornecedores', ProdutosFornecedoresController::class);

        Route::resource('estoque-transito', EstoqueTransitoController::class);
        Route::get('estoque-transito-fornecedores/{id}', [EstoqueTransitoController::class, 'fornecedores'])
            ->name('estoque-transito-fornecedores');

        Route::resource('estoque-local', EstoqueLocalController::class);
        Route::resource('produtos-categorias', CategoriasController::class);
        Route::resource('produtos-unidades', UnidadesController::class);
    });

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.produtos.')
    ->prefix('admin/produto')
    ->group(function () {
        Route::resource('estoques', EstoquesController::class);
    });
