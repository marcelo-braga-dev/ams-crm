<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtendimentoController extends Controller
{
    public function edit($id)
    {
        $dados = (new LeadsDadosService())->lead($id);

        return Inertia::render('Consultor/Leads/Atendimento/Edit', compact('dados'));
    }

    public function update($id)
    {
        (new UpdateStatusLeads())->atendimento($id);

        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }
}
