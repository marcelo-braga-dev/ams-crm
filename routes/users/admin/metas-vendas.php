<?php

use App\Http\Controllers\Admin\MetasVendas\ConsultoresController;
use Illuminate\Support\Facades\Route;

Route::name('admin.metas-vendas.')
    ->prefix('admin/metas-vendas')
    ->group(function () {
        Route::resource('consultores', ConsultoresController::class);
    });
