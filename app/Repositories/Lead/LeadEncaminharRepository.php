<?php

namespace App\Repositories\Lead;

use App\Models\Lead\LeadEncaminhadoHistorico;

class LeadEncaminharRepository
{
    public function armazenarHistorico($consultorId, $leads)
    {
        LeadEncaminhadoHistorico::create([
            'user_id' => id_usuario_atual(),
            'destinatario_id' => $consultorId,
            'lead_ids' => $leads,
            'qtd' => count($leads),
        ]);
    }
}
