<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Historicos\IniciarAtendimentoHistorico;
use App\src\Leads\Status\PreAtendimentoStatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AbertoController extends Controller
{
    public function show($id)
    {
        $dados = (new Leads())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $isSdr = is_sdr();

        return Inertia::render(
            'Consultor/Leads/Aberto/Show',
            compact('dados', 'historicos', 'status', 'contatos', 'isSdr')
        );
    }

    public function update($id, Request $request)
    {
        (new UpdateStatusLeads())->setAtendimento($id);
        (new LeadsHistoricos())->createHistorico($id, (new IniciarAtendimentoHistorico())->status());

        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($id, $request, $request->status);
        }

        modalSucesso('Atendimento Iniciado com Sucesso!');
        return redirect()->route('consultor.leads.atendimento.show', $id);
    }
}
