<?php

namespace App\Services\Pedido\Valores;

use App\Models\Pedido\Pedido;

class PrazoRastreioPedidoService
{
    public function atualizar($pedidoId, $prazoRastreio)
    {
        (new Pedido())
            ->find($pedidoId)
            ->update(['prazo_rastreio' => $prazoRastreio]);
    }
}
