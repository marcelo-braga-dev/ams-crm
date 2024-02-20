<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Historicos\IniciarAtendimentoHistorico;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();

        return Inertia::render('Consultor/Leads/Novo/Edit',
            compact('dados', 'historicos', 'status', 'contatos'));
    }

    public function update($id, Request $request)
    {
        (new UpdateStatusLeads())->novo($id);
        (new LeadsHistoricos())->createHistorico($id, (new IniciarAtendimentoHistorico())->status());

        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($id, $request, $request->status);
        }

        modalSucesso('Atendimento Iniciado com Sucesso!');
        return redirect()->route('consultor.leads.atendimento.show', $id);
    }
}
