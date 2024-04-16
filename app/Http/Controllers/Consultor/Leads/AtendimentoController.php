<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Historicos\AtivadoHistorico;
use App\src\Leads\Historicos\IniciarAtendimentoHistorico;
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

        return Inertia::render('Consultor/Leads/Atendimento/Show',
            compact('dados', 'status', 'historicos', 'contatos'));
    }

    public function update($id)
    {
        (new UpdateStatusLeads())->setAtivo($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtivadoHistorico())->status());

        modalSucesso('Cliente Ativo com Sucesso!');
        return redirect()->route('consultor.leads.ativo.show', $id);
    }

    public function store(Request $request)
    {
        // Finaliza Atendimento
        (new UpdateStatusLeads())->setFinalizado($request->id);
        (new LeadsHistoricos())->create($request->idLead, $request, $request->status);
        $request['msg'] = '';
        (new LeadsHistoricos())->create($request->id, $request, 'finalizado');

        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }
}
