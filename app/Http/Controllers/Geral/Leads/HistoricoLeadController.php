<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use Inertia\Inertia;

class HistoricoLeadController extends Controller
{
    public function index()
    {
        return Inertia::render('Geral/Leads/Historico/Page');
    }

    public function getHistorico()
    {
        $historico = (new LeadStatusHistoricos())
            ->with(['lead', 'destinatario'])
            ->orderByDesc('id')
            ->paginate();

        return response()->json($historico);
    }
}
