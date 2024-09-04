<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads\Leads;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\StatusAtendimentoLeads;
use Inertia\Inertia;

class FinalizadosController extends Controller
{
    public function show($id)
    {
        $dados = (new Leads())->getDados($id);
        $status = (new StatusAtendimentoLeads())->status();
        $contatos = (new MeioContatoLeads())->status();
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render('Consultor/Leads/Finalizado/Show',
            compact('dados', 'status', 'historicos', 'contatos'));
    }
}
