<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosConsultorNotificar;

class AguardandoFaturamentoStatus implements PedidosStatus
{
    private string $status = 'aguardando_faturamento';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getFaturando();
    }

    function getNomeStatus(): string
    {
        return 'Aguardando Faturamento';
    }

    function updateStatus($id, $alerta = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta);
        (new Pedidos())->dataPagamento($id);

        (new PedidosConsultorNotificar())->notificar($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }
}
