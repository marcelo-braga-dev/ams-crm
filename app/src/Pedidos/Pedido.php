<?php

namespace App\src\Pedidos;

use App\src\Pedidos\Status\PedidosStatus;

class Pedido
{
    public function updateStatus(int $id, PedidosStatus $pedido, $alerta = null)
    {
        $pedido->updateStatus($id, $alerta);
    }
}
