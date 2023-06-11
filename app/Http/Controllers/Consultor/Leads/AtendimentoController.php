<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render('Consultor/Leads/Atendimento/Show',
            compact('dados', 'status', 'historicos', 'contatos'));
    }

    public function update($id, Request $request)
    {
        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($id, $request, $request->status);
        } else {
            (new UpdateStatusLeads())->atendimento($id); // Finaliza Atendimento
            (new LeadsHistoricos())->create($id, $request, 'finalizado');
        }

        modalSucesso('Status atualizado!');
        return redirect()->back();
    }
}
