<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosConsultorNotificar;

class EncomendaStatus implements PedidosStatus
{
    private string $status = 'encomenda';

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
        return (new PedidosPrazos())->getEncomenda();
    }

    function getNomeStatus(): string
    {
        return 'Encomenda';
    }

    function updateStatus($id, $alerta = null, $prazo = 0)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $prazo, $alerta);

        (new PedidosConsultorNotificar())->notificar($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }
}
