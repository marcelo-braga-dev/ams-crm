<?php

use App\Http\Controllers\Supervisor\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

Route::name('supervisor.clientes.leads.')
    ->prefix('supervisor/clientes/leads')
    ->group(function () {
        Route::resource('leads-main', LeadsController::class);

        Route::post('update-consultor', [LeadsController::class, 'updateConsultor'])->name('update-consultor');
        Route::get('leads-cadastrados', [LeadsController::class, 'cadastrados'])->name('leads-cadastrados');
        Route::post('delete', [LeadsController::class, 'delete'])->name('delete');
        Route::post('ocultar', [LeadsController::class, 'ocultar'])->name('ocultar');
        Route::get('ocultos', [LeadsController::class, 'ocultos'])->name('ocultos');
        Route::post('restaurar', [LeadsController::class, 'restaurar'])->name('restaurar');
    });
