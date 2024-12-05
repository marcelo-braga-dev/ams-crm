<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadEncaminhadoHistorico;
use App\Models\Lead\LeadStatusHistoricos;
use Inertia\Inertia;

class HistoricoLeadController extends Controller
{
    public function index()
    {
        $encaminhados = (new LeadEncaminhadoHistorico)
            ->orderByDesc('id')
            ->get();

//        print_pre($encaminhados);
        return Inertia::render('Geral/Leads/Historico/Page', compact('encaminhados'));
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
