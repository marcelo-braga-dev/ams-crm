<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosConsultorNotificar;

class RevisarStatusPedido implements PedidosStatus
{
    private string $status = 'revisar';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getRevisar();
    }

    function getNomeStatus(): string
    {
        return 'Revisar Informações';
    }

    function updateStatus($id, $alerta = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta, 3);

        (new PedidosConsultorNotificar())->notificar($id, $this->getNomeStatus());
    }
}
