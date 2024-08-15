<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosConsultorNotificar;

class FaturadoStatus implements PedidosStatus
{
    private string $status = 'faturado';

    public function __construct(int $prazo = 0)
    {
        $this->prazo = $prazo;
    }

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getFaturado();
    }

    function getNomeStatus(): string
    {
        return 'Faturado';
    }

    function updateStatus($id, $alerta = null, $prazo = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $prazo, $alerta);

        (new PedidosConsultorNotificar())->notificar($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }
}
