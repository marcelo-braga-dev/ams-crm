<?php

use App\Http\Controllers\Geral\Leads\GerenciarLeadsController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\Leads\LeadsController;

Route::name('auth.leads.')
    ->prefix('auth/leads')
    ->group(function () {
        Route::resource('gerenciar', GerenciarLeadsController::class);

        Route::name('gerenciar.')
            ->prefix('auth/api/leads')
            ->group(function () {
                Route::get('get-gerenciar-paginate', [LeadsController::class, 'leadsCadastradosPaginate'])->name('get-gerenciar');
            });
    });
