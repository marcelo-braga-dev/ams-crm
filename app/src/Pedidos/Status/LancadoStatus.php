<?php

namespace App\src\Pedidos\Status;

use App\Models\Notificacoes;
use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\PedidosConsultorNotificar;

class LancadoStatus implements PedidosStatus
{
    private string $status = 'lancado';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getLancamento();
    }

    function getNomeStatus(): string
    {
        return 'Lançado';
    }

    function updateStatus($id, $alerta = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta);

        (new PedidosConsultorNotificar())->notificarUpdateStatus($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }
}
