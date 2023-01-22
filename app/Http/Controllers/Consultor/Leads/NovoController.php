<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\UpdateStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NovoController extends Controller
{
    public function edit($id)
    {
        $dados = (new LeadsDadosService())->lead($id);

        return Inertia::render('Consultor/Leads/Novo/Edit', compact('dados'));
    }
    public function update($id)
    {
        (new UpdateStatusLeads())->novo($id);

        modalSucesso('Status atualizado!');
        return redirect()->route('consultor.leads.main.index');
    }
}
