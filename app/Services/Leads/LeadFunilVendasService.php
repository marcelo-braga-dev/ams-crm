<?php

namespace App\Services\Leads;

use App\Models\LeadsDEPREECATED\Leads;

class LeadFunilVendasService
{
    public function getLeadsGroupedByStatus($setor = null, $usuario = null)
    {
        $leads = (new Leads)
            ->dadosCard()
            ->when($setor, function ($query) use ($setor) {
                return $query->where('setor_id', $setor);
            })
            ->when($usuario, function ($query) use ($usuario) {
                return $query->where('user_id', $usuario);
            })
            ->orderByRaw("
                CASE
                    WHEN status = 'ativo' THEN ultimo_pedido_data
                    ELSE '9999-12-31'
                END ASC
            ")
            ->orderByRaw("
                CASE
                    WHEN status NOT IN ('novo', 'ativo') THEN contato_data
                    ELSE '0000-01-01'
                END DESC
            ")
            ->orderBy('contato_data', 'DESC')
            ->get();

        return $leads->groupBy('status');
    }
}
