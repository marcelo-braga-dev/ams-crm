<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Models\LeadsHistoricosComentarios;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function show($id)
    {
        $dados = (new Leads())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getConsultores($dados['infos']['setor']);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Atendimento/Show',
            compact('dados', 'status', 'historicos', 'contatos', 'consultores'));
    }

//    public function update($id, Request $request)
//    {
//        if ($request->salvar_msg) {
//            (new LeadsHistoricos())->create($id, $request, $request->status);
//        } else {
//            (new UpdateStatusLeads())->atendimento($id); // Finaliza Atendimento
//            (new LeadsHistoricos())->create($id, $request, 'finalizado');
//        }
//
//        modalSucesso('Status atualizado!');
//        return redirect()->route('consultor.leads.main.index');
//    }

    public function voltarStatus($id)
    {
        (new UpdateStatusLeads())->setNovo($id);
        (new LeadsHistoricos())->createHistorico($id, (new NovoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-aberto.edit', $id);
    }

    public function avancarStatus($id)
    {
        (new UpdateStatusLeads())->setFinalizado($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtivoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-ativo.show', $id);
    }
}
