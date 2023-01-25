<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function edit($id)
    {
        $dados = (new LeadsDadosService())->lead($id);

        $status = (new StatusAtendimentoLeads())->status();

        $contatos = (new MeioContatoLeads())->status();

        $historicos = (new LeadsHistoricos())->get($id);

        return Inertia::render('Consultor/Leads/Atendimento/Edit',
            compact('dados', 'status', 'historicos', 'contatos'));
    }

    public function update($id, Request $request)
    {
        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($id, $request);
        } else
            (new UpdateStatusLeads())->atendimento($id);


        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }
}
