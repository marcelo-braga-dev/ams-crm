<?php

use App\Http\Controllers\Admin\Dashboard\EconomicosController;
use App\Http\Controllers\Admin\Dashboard\FinanceirosController;
use App\Http\Controllers\Admin\Dashboard\VendasController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'auth.admins'])
    ->name('admin.dashboard.')
    ->prefix('admin/dashboard')
    ->group(function () {
        Route::resource('economicos', EconomicosController::class);
        Route::resource('financeiros', FinanceirosController::class);
        Route::resource('vendas', VendasController::class);
    });
