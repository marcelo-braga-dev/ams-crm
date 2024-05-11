<?php

namespace App\src\Pedidos;

use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\Status\EncomendaStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoPrazoStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\FaturadoVistaStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;

class StatusPedidos
{
    public function getStatus(): array
    {
        $novo = (new RevisarStatusPedido());
        $conferencia = (new ConferenciaStatusPedido());
        $lancado = (new LancadoStatus());
        $nota = (new AguardandoNotaStatus());
        $pagamento = (new AguardandoPagamentoStatus());
        $faturamento = (new AguardandoFaturamentoStatus());
        $faturado = (new FaturadoStatus());
        $faturadoVista = (new FaturadoVistaStatus());
        $faturadoPrazo = (new FaturadoPrazoStatus());
        $acompanhamento = (new AcompanhamentoStatus());
        $entregue = (new EntregueStatus());
        $cancelado = (new CanceladoStatus());
        $encomenda = (new EncomendaStatus());

        return [
            $novo->getStatus() => $novo->getNomeStatus(),
            $conferencia->getStatus() => $conferencia->getNomeStatus(),
            $lancado->getStatus() => $lancado->getNomeStatus(),
            $nota->getStatus() => $nota->getNomeStatus(),
            $pagamento->getStatus() => $pagamento->getNomeStatus(),
            $faturamento->getStatus() => $faturamento->getNomeStatus(),
            $faturado->getStatus() => $faturado->getNomeStatus(),
            $faturadoVista->getStatus() => $faturadoVista->getNomeStatus(),
            $faturadoPrazo->getStatus() => $faturadoPrazo->getNomeStatus(),
            $entregue->getStatus() => $entregue->getNomeStatus(),
            $acompanhamento->getStatus() => $acompanhamento->getNomeStatus(),
            $cancelado->getStatus() => $cancelado->getNomeStatus(),
            $encomenda->getStatus() => $encomenda->getNomeStatus(),
        ];
    }

    public function getNomeStatus(string $status): string
    {
        return $this->getStatus()[$status] ?? '';
    }
}
