<?php

namespace App\src\Pedidos;

use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\Status\EncomendaStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\FaturadoVistaStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;

class PedidoRetrocederStatus
{
    public function conferencia(int $id, $motivo): void
    {
        (new ConferenciaStatusPedido())->updateStatus($id, $motivo);
    }

    public function reprovado(int $id, string $motivo): void
    {
        (new RevisarStatusPedido())->updateStatus($id, $motivo);
    }

    public function lancado(int $id, $motivo)
    {
        (new LancadoStatus())->updateStatus($id, $motivo);
    }

    public function pagamento($id, $motivo)
    {
//        (new AguardandoNotaStatus())->updateStatus($id, $motivo);
    }

    public function faturado($id, $motivo)
    {
//        (new AguardandoFaturamentoStatus())->updateStatus($id, $motivo);
    }

    public function cancelado($id, $motivo)
    {
        (new Pedidos())->restaurar($id, $motivo);
    }

    public function entregue($id, $motivo)
    {
        (new EntregueStatus())->updateStatus($id, $motivo);
    }

    public function encomenda($id, $motivo)
    {
        (new EncomendaStatus())->updateStatus($id, $motivo);
    }

    public function aguardandoNota($id, $motivo)
    {
        (new AguardandoNotaStatus())->updateStatus($id, $motivo);
    }

    public function aguardandoPagamento($id, $motivo)
    {
        (new AguardandoPagamentoStatus())->updateStatus($id, $motivo);
    }

    public function aguardandoFaturamento($id, $motivo)
    {
        (new AguardandoFaturamentoStatus())->updateStatus($id, $motivo);
    }

    public function faturadoVista($id, $motivo)
    {
        (new FaturadoVistaStatus())->updateStatus($id, $motivo);
    }

    public function faturadoPrazo($id, $motivo)
    {
        (new FaturadoVistaStatus())->updateStatus($id, $motivo);
    }

    public function acompanhamento($id, $motivo)
    {
        (new AcompanhamentoStatus())->updateStatus($id, $motivo);
    }
}
