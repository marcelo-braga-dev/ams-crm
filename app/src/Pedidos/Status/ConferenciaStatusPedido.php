<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\PedidosAdminsNotificar;

class ConferenciaStatusPedido implements PedidosStatus
{
    private string $status = 'conferencia';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getConferencia();
    }

    function getNomeStatus(): string
    {
        return 'Conferência';
    }

    function getNotificacoesConsultor($idPedido): array
    {
        return [
            'titulo' => 'Pedido ' . $this->getNomeStatus() . '.',
            'msg' => 'Pedido n. ' . $idPedido . ' foi alterado seu status para ' . $this->getNomeStatus() . '.',
        ];
    }

    function updateStatus($id, $alerta = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta);

        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }
}
