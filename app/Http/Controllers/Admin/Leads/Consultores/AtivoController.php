<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Http\Controllers\Controller;
use App\Models\LeadsHistoricos;
use App\Models\LeadsHistoricosComentarios;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtivoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);
        $consultores = (new User())->getConsultores($dados['infos']['setor']);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Ativo/Show',
            compact('dados', 'status', 'historicos', 'contatos', 'consultores'));
    }

    public function store(Request $request)
    {
        (new LeadsHistoricosComentarios())->create($request->id, $request->msg);
    }

    public function voltarStatus($id)
    {
        (new UpdateStatusLeads())->setAtendimento($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtendimentoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-atendimento.show', $id);
    }

    public function avancarStatus($id)
    {
        (new UpdateStatusLeads())->setFinalizado($id);
        (new LeadsHistoricos())->createHistorico($id, (new FinalizadoStatusLeads())->getStatus());

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-finalizado.show', $id);
    }
}
