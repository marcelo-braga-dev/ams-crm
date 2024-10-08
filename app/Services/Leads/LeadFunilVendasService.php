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
            // Ordenação condicional
            ->orderByRaw("CASE WHEN status = 'novo' THEN updated_at ELSE NULL END DESC") // Ordena por status_data para "novo"
            ->orderByRaw("CASE WHEN status != 'novo' THEN contato_data ELSE NULL END ASC") // Ordena por contato_data para os demais status
            ->get();

        // Agrupa os leads por status
        return $leads->groupBy('status');


//        $leads = (new Leads)->dadosCard()
//            ->when($setor, function ($query) use ($setor) {
//                return $query->where('setor_id', $setor);
//            })
//            ->when($usuario, function ($query) use ($usuario) {
//                return $query->where('user_id', $usuario);
//            })
////            ->whereIn('user_id', [id_usuario_atual()])
//            ->orderBy('contato_data', 'asc')
//            ->get();

        return $leads->groupBy('status');
    }
}
