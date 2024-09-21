<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\Historicos\PreAtendimentoHistorico;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsANTIGO())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();

        return Inertia::render(
            'Consultor/Leads/Novo/Edit',
            compact('dados', 'historicos', 'status', 'contatos')
        );
    }

    public function update($id, Request $request)
    {
        (new UpdateStatusLeads())->setPreAtendimento($id);
        (new LeadsHistoricos())->createHistorico($id, (new PreAtendimentoHistorico())->status());

        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($id, $request, $request->status);
        }

        modalSucesso('Atendimento Iniciado com Sucesso!');
        return redirect()->route('consultor.leads.pre_atendimento.show', $id);
    }
}
