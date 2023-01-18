<?php

namespace App\src\Pedidos;

use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\LancadoStatus;

class PedidoRetrocederStatus
{
    public function conferencia(int $id, $motivo): void
    {
        (new ConferenciaStatusPedido())->updateStatus($id, $motivo);
    }

    public function reprovado(int $id, string $motivo): void
    {
        (new ConferenciaStatusPedido())->updateStatus($id, $motivo);
    }

    public function lancado(int $id, $motivo)
    {
        (new ConferenciaStatusPedido())->updateStatus($id, $motivo);
    }

    public function boleto($id, $motivo)
    {
        (new LancadoStatus())->updateStatus($id, $motivo);
    }

    public function pagamento($id, $motivo)
    {
        (new AguardandoNotaStatus())->updateStatus($id, $motivo);
    }

    public function faturando($id, $motivo)
    {
        (new AguardandoPagamentoStatus())->updateStatus($id, $motivo);
    }

    public function faturado($id, $motivo)
    {
        (new AguardandoFaturamentoStatus())->updateStatus($id, $motivo);
    }

    public function cancelado($id, $motivo)
    {
        (new Pedidos())->restaurar($id);
    }

    public function entregre($id, $motivo)
    {
        $prazo = (new PedidosHistoricos())->getPrazoEntreguaRetroceder($id);

        (new FaturadoStatus())->updateStatus($id, $motivo, $prazo);
    }
}
