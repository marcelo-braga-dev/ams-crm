<?php

namespace App\Services\Leads;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\Models\LeadsHistoricos;
use App\Models\User;
use App\src\Leads\StatusAtendimentoLeads;

class HistoricoDadosService
{
    public function dados(int $id)
    {
        $items = (new LeadsHistoricos())->dados($id);

        $status = (new StatusAtendimentoLeads())->getStatus();
        $statusNomes = (new MeioContatoLeads())->getStatusNomes();
        $usuarios = (new User())->getNomes();

        $dados = [];
        foreach ($items as $item) {
            $dados[] = [
                'id' => $item['id'],
                'id_pedido' => $item['pedidos_id'],
                'nome' => $usuarios[$item['users_id']],
                'status' => $status[$item['status']] ?? 'Inderteminado',
                'meio_contato' => $statusNomes[$item['meio_contato']] ?? '',
                'msg' => $item->msg,
                'data_criacao' => date('d/m/Y H:i', strtotime($item->updated_at))
            ];
        }
        return $dados;
    }
}
