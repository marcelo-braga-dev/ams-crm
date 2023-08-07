<?php

use App\Http\Controllers\Admin\Leads\Consultores\AtendimentoController;
use App\Http\Controllers\Admin\Leads\Consultores\AtivoController;
use App\Http\Controllers\Admin\Leads\Consultores\CardsController;
use App\Http\Controllers\Admin\Leads\Consultores\FinalizadoController;
use App\Http\Controllers\Admin\Leads\Consultores\NovoController;
use App\Http\Controllers\Admin\Leads\ImportarController;
use App\Http\Controllers\Admin\Leads\ImportarHistoricoController;
use App\Http\Controllers\Admin\Leads\LeadsController;
use App\Http\Controllers\Admin\Leads\RelatoriosController;
use App\Http\Controllers\Admin\Leads\StatusController;
use Illuminate\Support\Facades\Route;

Route::name('admin.clientes.leads.')
    ->prefix('admin/clientes/leads')
    ->group(function () {
        Route::resource('leads-main', LeadsController::class);
        Route::resource('importar', ImportarController::class);
        Route::resource('importar-historico', ImportarHistoricoController::class);
        Route::resource('status', StatusController::class);

        Route::post('update-consultor', [LeadsController::class, 'updateConsultor'])->name('update-consultor');
        Route::get('leads-cadastrados', [LeadsController::class, 'cadastrados'])->name('leads-cadastrados');
        Route::post('delete', [LeadsController::class, 'delete'])->name('delete');
        Route::post('ocultar', [LeadsController::class, 'ocultar'])->name('ocultar');
        Route::get('ocultos', [LeadsController::class, 'ocultos'])->name('ocultos');
        Route::post('restaurar', [LeadsController::class, 'restaurar'])->name('restaurar');
        Route::get('alterar-consultor', [LeadsController::class, 'alterarConsultor'])->name('alterar-consultor');
        Route::post('limpar-consultor', [LeadsController::class, 'limparConsultor'])->name('limpar-consultor');

    });

Route::name('admin.leads.')
    ->prefix('admin/leads/relatorios')
    ->group(function () {
        Route::resource('relatorios', RelatoriosController::class);
        Route::resource('consultores-cards', CardsController::class);

        Route::resource('cards-aberto', NovoController::class);
        Route::resource('cards-atendimento', AtendimentoController::class);
        Route::resource('cards-ativo', AtivoController::class);
        Route::resource('cards-finalizado', FinalizadoController::class);
    });
