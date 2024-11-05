<?php

use App\Http\Controllers\Admin\Produtos\CategoriasController;
use App\Http\Controllers\Admin\Produtos\EstoquesController;
use App\Http\Controllers\Admin\Produtos\FornecedoresController;
use App\Http\Controllers\Admin\Produtos\ProdutosController;
use App\Http\Controllers\Admin\Produtos\UnidadesController;
use App\src\Produtos\Integracoes\Edeltec\IntegracoesController;
use Illuminate\Support\Facades\Route;

// Produtos Fornecedores
Route::middleware(['auth', 'auth.admins'])
    ->name('admin.')
    ->prefix('admin')
    ->group(function () {
        Route::resource('produtos', ProdutosController::class);

        Route::resource('produtos-categorias', CategoriasController::class);
        Route::resource('produtos-unidades', UnidadesController::class);
    });

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.produtos.')
    ->prefix('admin/produto')
    ->group(function () {
        Route::resource('estoques', EstoquesController::class);
        Route::get('get-produtos', [ProdutosController::class, 'produtos'])->name('get-produtos');
        Route::post('update-status', [ProdutosController::class, 'updateStatus'])->name('update-status');
        Route::post('update-estoque', [ProdutosController::class, 'updateEstoque'])->name('update-estoque');
        Route::resource('integracoes', IntegracoesController::class);
        Route::get('integrar', [IntegracoesController::class, 'integrar'])->name('integrar');
        Route::delete('deletar-galeria', [ProdutosController::class, 'deletarGaleria'])->name('deletar-galeria');

        Route::resource('fornecedores', FornecedoresController::class);
    });
