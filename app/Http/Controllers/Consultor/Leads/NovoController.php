<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsHistoricos;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Historicos\IniciarAtendimentoHistorico;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render('Consultor/Leads/Novo/Edit',
            compact('dados', 'historicos'));
    }

    public function update($id)
    {
        (new UpdateStatusLeads())->novo($id);
        (new LeadsHistoricos())->createHistorico($id, (new IniciarAtendimentoHistorico())->status());

        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }
}
