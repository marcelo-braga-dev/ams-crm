<?php

use App\Http\Controllers\Admin\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

Route::name('admin.clientes.leads.')
    ->prefix('admin/clientes/leads')
    ->group(function () {
        Route::resource('leads-main', LeadsController::class);

        Route::post('update-consultor', [LeadsController::class, 'updateConsultor'])
            ->name('update-consultor');

        Route::get('leads-cadastrados', [LeadsController::class, 'cadastrados'])
            ->name('leads-cadastrados');
    });
