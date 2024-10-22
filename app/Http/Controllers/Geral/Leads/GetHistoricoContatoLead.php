<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Models\LeadsDEPREECATED\LeadsContatosRealizados;
use Illuminate\Http\Request;

class GetHistoricoContatoLead
{
    public function getHistorico($id)
    {
        $historico = (new LeadsContatosRealizados())
            ->with(['usuario', 'telefone'])
            ->where('lead_id', $id)
            ->get();
//print_pre($historico);
        return response()->json($historico);
    }
}
