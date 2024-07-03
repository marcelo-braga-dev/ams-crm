<?php

use App\Http\Controllers\Admin\Dashboard\EconomicosController;
use App\Http\Controllers\Admin\Dashboard\FinanceirosController;
use App\Http\Controllers\Admin\Dashboard\LeadsController;
use App\Http\Controllers\Admin\Dashboard\RelatoriosController;
use App\Http\Controllers\Admin\Dashboard\VendasController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.dashboard.')
    ->prefix('admin/dashboard')
    ->group(function () {
        Route::resource('economicos', EconomicosController::class);
        Route::resource('financeiros', FinanceirosController::class);
        Route::resource('vendas', VendasController::class);
        Route::resource('relatorios', RelatoriosController::class);
        Route::resource('leads', LeadsController::class);

        Route::get('leads-relatorio', [LeadsController::class, 'relatorios'])->name('leads.relatorio');

        Route::get('vendas-registros', [VendasController::class, 'registros'])->name('vendas.registros');
        Route::get('vendas-leads', [VendasController::class, 'leadsVendas'])->name('vendas.leads');
        Route::get('vendas-fornecedores', [VendasController::class, 'fornecedoresVendas'])->name('vendas.fornecedores');
        Route::get('get-vendas-fornecedores', [VendasController::class, 'getVendasFornecedor'])->name('get-vendas.fornecedores');
    });
