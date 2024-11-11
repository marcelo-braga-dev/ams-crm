<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Models\Lead\LeadContatoRealizado;
use App\Models\Lead\LeadContatoRealizadoAnotacao;
use Illuminate\Http\Request;

class HistoricoContatoLead
{
    public function getHistorico($id)
    {
        $historico = (new LeadContatoRealizado())
            ->with(['usuario', 'telefone'])
            ->where('lead_id', $id)
            ->orderByDesc('id')
            ->get();

        return response()->json($historico);
    }

    public function setAnotacao($id, Request $request)
    {
        (new LeadContatoRealizadoAnotacao())->create([
            'user_id' => id_usuario_atual(),
            'contato_id' => $id,
            'msg' => $request->msg
        ]);

        return response()->json(true);
    }
}
