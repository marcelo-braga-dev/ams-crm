<?php

namespace App\Services\Leads;

use App\Models\LeadsDEPREECATED\Leads;

class LeadFunilVendasService
{
    public function getLeadsGroupedByStatus($setor = null, $usuario = null)
    {
        $leads = (new Leads)->dadosCard()
            ->when($setor, function ($query) use ($setor) {
                return $query->where('setor_id', $setor);
            })
            ->when($usuario, function ($query) use ($usuario) {
                return $query->where('user_id', $usuario);
            })
            ->whereIn('user_id', supervisionados(id_usuario_atual()))
            ->orderBy('contato_data', 'asc')
            ->get();

        return $leads->groupBy('status')->toArray();
    }
}
