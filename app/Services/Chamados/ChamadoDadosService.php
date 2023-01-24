<?php

namespace App\Services\Chamados;

use App\Models\PedidosChamados;
use App\src\Chamados\StatusChamados;

class ChamadoDadosService
{
    public function dados($dados)
    {
        return [
            'id' => $dados->id,
            'id_pedido' => $dados->pedidos_id,
            'cliente' => getNomeCliente($dados->pedidos_id),
            'status' => (new StatusChamados())->getNomeStatus($dados->status),
            'titulo' => $dados->titulo,
            'prazo' => $dados->prazo,
            'data' => date('d/m/y H:i', strtotime($dados->status_data))
        ];
    }
}
