<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosConsultorNotificar;

class EntregueStatus implements PedidosStatus
{
    private string $status = 'entregue';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return 0;
    }

    function getNomeStatus(): string
    {
        return 'Entregue';
    }

    function updateStatus($id, $alerta = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta);

        (new PedidosConsultorNotificar())->notificar($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }
}
