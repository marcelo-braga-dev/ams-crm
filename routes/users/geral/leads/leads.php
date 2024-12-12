<?php

use App\Http\Controllers\Geral\Ferramentas\Whatsapp\LeadsWhatsappController;
use App\Http\Controllers\Geral\Leads\Api\FindLeadApiController;
use App\Http\Controllers\Geral\Leads\Api\GetAllDataLeadController;
use App\Http\Controllers\Geral\Leads\Api\GetLeadApiController;
use App\Http\Controllers\Geral\Leads\Api\InicioChatApiController;
use App\Http\Controllers\Geral\Leads\Api\UpdadeStatusLeadController;
use App\Http\Controllers\Geral\Leads\FunilVendasKanbanController;
use App\Http\Controllers\Geral\Leads\LeadController;
use App\Http\Controllers\Geral\Leads\LeadsController;
use Illuminate\Support\Facades\Route;

Route::name('auth.')
    ->prefix('auth')
    ->group(function () {

        Route::resource('lead', LeadController::class);

        Route::prefix('lead_')
            ->name('lead.')
            ->group(function () {
                Route::resource('funil-vendas-kanban', FunilVendasKanbanController::class);
            });

        Route::prefix('api-lead')
            ->name('lead.')
            ->group(function () {
                Route::get('find/{id}', FindLeadApiController::class)->name('find-lead');
                Route::get('lead/{id}', GetLeadApiController::class)->name('get-lead');
                Route::get('get-all-lead/{id}', GetAllDataLeadController::class)->name('get-all-data');
                Route::put('update-status/{id}', UpdadeStatusLeadController::class)->name('update-status');
                Route::post('iniciado-chat', InicioChatApiController::class)->name('iniciado-chat');
            });


        //---- DEPRECATED ----//
        Route::resource('leads', LeadsController::class);

        Route::prefix('lead/funil-vendas')
            ->name('leads.')
            ->group(function () {
                Route::resource('funil-vendas-kanban', FunilVendasKanbanController::class,);

                Route::get('funil-vendas-kanbanindex-registros', [FunilVendasKanbanController::class, 'getIndexRegistros'])
                    ->name('funil-vendas-kanban.index-registros');

                Route::put('ativar-whatsapp/{id}', [LeadsWhatsappController::class, 'ativarNumeroWhatsapp'])
                    ->name('ativar-whatsapp');
                Route::put('inativar-whatsapp/{numero}', [LeadsWhatsappController::class, 'inativarNumeroWhatsapp'])
                    ->name('inativar-whatsapp');
            });

        Route::prefix('lead/avancar-status')
            ->name('leads.avancar-status.')
            ->group(function () {
                Route::post('novo/{id}', [LeadsController::class, 'novo'])->name('novo');
                Route::post('fazer/{id}', [LeadsController::class, 'fazer'])->name('fazer');
                Route::post('progresso/{id}', [LeadsController::class, 'progresso'])->name('progresso');
                Route::post('revisao/{id}', [LeadsController::class, 'revisao'])->name('revisao');
                Route::post('concluido/{id}', [LeadsController::class, 'concluido'])->name('concluido');
                Route::post('finalizados/{id}', [LeadsController::class, 'finalizados'])->name('finalizados');
                Route::post('inativos/{id}', [LeadsController::class, 'inativos'])->name('inativos');
            });
    });
