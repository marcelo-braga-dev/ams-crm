<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\StatusAtendimentoLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AtivoController extends Controller
{
    public function show($id)
    {
        $dados = (new Leads())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render('Consultor/Leads/Ativo/Show',
            compact('dados', 'status', 'historicos', 'contatos'));
    }
}
