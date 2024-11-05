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
            ->orderByRaw("CASE
        WHEN status = 'concluido' THEN ultimo_pedido_data
        ELSE NULL
        END ASC")
            ->orderByRaw("CASE
        WHEN status NOT IN ('novo', 'concluido') THEN contato_data
        ELSE NULL
        END DESC") // Para outros status, ordena por contato_data em ordem crescente
            ->orderBy('updated_at', 'ASC') // Para todos os leads, ordena por updated_at em ordem decrescente
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
