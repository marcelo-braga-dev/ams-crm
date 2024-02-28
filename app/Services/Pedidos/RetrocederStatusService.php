<?php

namespace App\Services\Pedidos;

use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\src\Pedidos\PedidoRetrocederStatus;
use App\src\Pedidos\PedidoUpdateStatus;
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
use App\src\Pedidos\StatusPedidos;

class RetrocederStatusService
{
    public function retroceder($id, $motivo)
    {
        $pedido = (new Pedidos())->find($id);

        $reprovados = (new RevisarStatusPedido())->getStatus();
        $lancado = (new LancadoStatus())->getStatus();
        $nota = (new AguardandoNotaStatus())->getStatus();
        $pagamento = (new AguardandoPagamentoStatus())->getStatus();
        $faturamento = (new AguardandoFaturamentoStatus())->getStatus();
        $faturado = (new FaturadoStatus())->getStatus();
        $faturadoVista = (new FaturadoVistaStatus())->getStatus();
        $faturadoPrazo = (new FaturadoPrazoStatus())->getStatus();
        $acompanhamento = (new AcompanhamentoStatus())->getStatus();
        $entregue = (new EntregueStatus())->getStatus();
        $cancelado = (new CanceladoStatus())->getStatus();
        $encomenda = (new EncomendaStatus())->getStatus();

        $retroceder = (new PedidoRetrocederStatus());

        if ($entregue) {
            $status = (new PedidosHistoricos())->retrocederStatus($id);

            switch ($status) {
                case $faturado:
                    $retroceder->faturado($id, $motivo);
                    break;
                case $faturadoVista:
                    $retroceder->faturadoVista($id, $motivo);
                    break;
                case $faturadoPrazo:
                    $retroceder->faturadoPrazo($id, $motivo);
                    break;
                case $acompanhamento:
                    $retroceder->acompanhamento($id, $motivo);
                    break;
            }
            return;
        }

        switch ($pedido->status) {
            case $lancado:
            case $reprovados:
            case $encomenda:
                $retroceder->conferencia($id, $motivo);
                break;
            case $nota:
                $retroceder->lancado($id, $motivo);
                break;
            case $pagamento:
                $retroceder->aguardandoNota($id, $motivo);
                break;
            case $faturamento:
                $retroceder->aguardandoPagamento($id, $motivo);
                break;
            case $faturadoVista:
            case $faturadoPrazo:
            case $faturado:
                $retroceder->aguardandoFaturamento($id, $motivo);
                break;
            case $acompanhamento:
                $retroceder->faturado($id, $motivo);
                break;
            default:
                throw new \DomainException('Falha na atualização do pedido!');
        }
    }
}
