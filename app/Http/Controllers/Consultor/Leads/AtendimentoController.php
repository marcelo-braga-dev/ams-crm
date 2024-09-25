<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Historicos\AtivadoHistorico;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);
        $isSdr = is_sdr();

        return Inertia::render(
            'Consultor/Leads/Atendimento/Show',
            compact('dados', 'status', 'historicos', 'contatos', 'isSdr')
        );
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
