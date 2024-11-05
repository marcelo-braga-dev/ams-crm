<?php

use App\Http\Controllers\Admin\Leads\Consultores\AbertoController;
use App\Http\Controllers\Admin\Leads\Consultores\AtendimentoController;
use App\Http\Controllers\Admin\Leads\Consultores\AtivoController;
use App\Http\Controllers\Admin\Leads\Consultores\CardsController;
use App\Http\Controllers\Admin\Leads\Consultores\FinalizadoController;
use App\Http\Controllers\Admin\Leads\Consultores\LeadsRelatoriosController;
use App\Http\Controllers\Admin\Leads\Consultores\NovoController;
use App\Http\Controllers\Admin\Leads\Consultores\PreAtendimentoController;
use App\Http\Controllers\Admin\Leads\Encaminhados\EncaminhadosController;
use App\Http\Controllers\Admin\Leads\GerenciarLead\EncaminharLeadsStatusController;
use App\Http\Controllers\Admin\Leads\GerenciarLead\GerenciarLeadsController as LeadsCardsController;
use App\Http\Controllers\Admin\Leads\GerenciarLead\RemoverStatusLeadsConsultorController;
use App\Http\Controllers\Admin\Leads\Historicos\HistoricosController;
use App\Http\Controllers\Admin\Leads\ImportarController;
use App\Http\Controllers\Admin\Leads\ImportarHistoricoController;
use App\Http\Controllers\Admin\Leads\LeadsController;
use App\Http\Controllers\Admin\Leads\RelatoriosController;
use App\Http\Controllers\Admin\Leads\StatusController;
use Illuminate\Support\Facades\Route;


Route::name('admin.leads.')
    ->prefix('admin/leads')
    ->group(function () {

        Route::name('gerenciar.')
            ->prefix('gerenciar')
            ->group(function () {
                Route::resource('gerenciar-leads', LeadsCardsController::class);
                Route::get('get-registros', [LeadsCardsController::class, 'getRegistros'])->name('get-registros');

                Route::put('remover-consultor', RemoverStatusLeadsConsultorController::class)->name('remover-status-consultor');
                Route::put('encaminhar-status', EncaminharLeadsStatusController::class)->name('encaminhar-status');
            });
    });


// ======
// Remover
// ======
Route::name('admin.clientes.leads.')
    ->prefix('admin/clientes/leads')
    ->group(function () {
        Route::resource('leads-main', LeadsController::class);
        Route::resource('importar', ImportarController::class);
        Route::resource('importar-historico', ImportarHistoricoController::class);
        Route::resource('status', StatusController::class);

        Route::post('update-consultor', [LeadsController::class, 'updateConsultor'])->name('update-consultor');
        Route::get('leads-cadastrados', [LeadsController::class, 'cadastrados'])->name('leads-cadastrados');
        Route::get('leads-acompanhar', [LeadsController::class, 'acompanharLeads'])->name('leads-acompanhar');
        Route::post('delete', [LeadsController::class, 'delete'])->name('delete');
        Route::post('ocultar', [LeadsController::class, 'ocultar'])->name('ocultar');
        Route::get('ocultos', [LeadsController::class, 'ocultos'])->name('ocultos');
        Route::post('restaurar', [LeadsController::class, 'restaurar'])->name('restaurar');
        Route::post('remover-consultor', [LeadsController::class, 'removerConsultor'])->name('remover-consultor');
        Route::post('remover-sdr', [LeadsController::class, 'removerSdr'])->name('remover-sdr');
        Route::put('alterar-consultor', [LeadsController::class, 'alterarConsultor'])->name('alterar-consultor');
        Route::put('alterar-sdr', [LeadsController::class, 'alterarSdr'])->name('alterar-sdr');
        Route::put('inativar-lead', [LeadsController::class, 'inativarLead'])->name('inativar-lead');
        Route::put('reativar-lead', [LeadsController::class, 'reativarLead'])->name('reativar-lead');
        Route::post('limpar-consultor', [LeadsController::class, 'limparConsultor'])->name('limpar-consultor');
        Route::get('get-leads-cadastrados', [LeadsController::class, 'leadsCadastrados'])->name('get-leads-cadastrados');
        Route::get('registros-encaminhar', [LeadsController::class, 'registrosEncaminhar'])->name('registros-encaminhar');
        Route::post('finalizar-status-lead/{id}', [LeadsController::class, 'finaliarStatus'])->name('finalizar-status-lead');

        Route::get('get-leads-cadastrados-paginate', [LeadsController::class, 'leadsCadastradosPaginate'])->name('get-leads-cadastrados-paginate');

        Route::get('leads-relatorio', [RelatoriosController::class, 'relatorio'])->name('leads-relatorio');
        Route::get('leads-dados-relatorio', [RelatoriosController::class, 'dados'])->name('leads-dados-relatorio');
    });

Route::name('admin.leads.')
    ->prefix('admin/leads/relatorios')
    ->group(function () {

        Route::resource('relatorios', RelatoriosController::class);
        Route::resource('consultores-cards', CardsController::class);
        Route::resource('encaminhados', EncaminhadosController::class);
        Route::resource('historicos', HistoricosController::class);

        Route::resource('cards-novo', NovoController::class);
        Route::resource('cards-pre_atendimento', PreAtendimentoController::class);
        Route::put('cards-pre_atendimento/voltar_status/{id}', [PreAtendimentoController::class, 'voltarStatus'])->name('cards-pre_atendimento.voltar_status');
        Route::resource('cards-aberto', AbertoController::class);
        Route::resource('cards-atendimento', AtendimentoController::class);
        Route::resource('cards-ativo', AtivoController::class);
        Route::resource('cards-finalizado', FinalizadoController::class);

        Route::post('limpar-consultor', [CardsController::class, 'limparConsultor'])->name('limpar-consultor');
        Route::post('limpar-sdr', [LeadsController::class, 'limparSdr'])->name('limpar-sdr');

        Route::get('registros', [CardsController::class, 'registros'])
            ->name('registros');

        Route::post('novo-avancar/{id}', [NovoController::class, 'avancarStatus'])
            ->name('novo-avancar');

        Route::post('ativo-voltar/{id}', [AtivoController::class, 'voltarStatus'])
            ->name('ativo-voltar');
        Route::post('ativo-avancar/{id}', [AtivoController::class, 'avancarStatus'])
            ->name('ativo-avancar');

        Route::post('aberto-voltar/{id}', [AbertoController::class, 'voltarStatus'])
            ->name('aberto-voltar');
        Route::post('aberto-avancar/{id}', [AbertoController::class, 'avancarStatus'])
            ->name('aberto-avancar');

        Route::post('atendimento-voltar/{id}', [AtendimentoController::class, 'voltarStatus'])
            ->name('atendimento-voltar');
        Route::post('atendimento-avancar/{id}', [AtendimentoController::class, 'avancarStatus'])
            ->name('atendimento-avancar');

        Route::post('finalizado-voltar/{id}', [FinalizadoController::class, 'voltarStatus'])
            ->name('finalizado-voltar');

        Route::post('update-consultor', [LeadsRelatoriosController::class, 'updateConsultor'])
            ->name('update-consultor');

        Route::post('adicionar-comentarios', [LeadsRelatoriosController::class, 'adicionarComentarios'])
            ->name('adicionar-comentarios');

        Route::post('atualizar-status', [LeadsRelatoriosController::class, 'atualizarStatus'])
            ->name('atualizar-status');
    });
