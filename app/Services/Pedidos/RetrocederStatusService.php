<?php

namespace App\Services\Pedidos;

use App\Models\Pedidos;
use App\src\Pedidos\PedidoRetrocederStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;

class RetrocederStatusService
{
    public function retroceder($id, $motivo)
    {
        $pedido = (new Pedidos())->find($id);

        $pagamentoStatus = (new AguardandoPagamentoStatus())->getStatus();
        $lancadoStatus = (new LancadoStatus())->getStatus();
        $notaStatus = (new AguardandoNotaStatus())->getStatus();
        $faturamentoStatus = (new AguardandoFaturamentoStatus())->getStatus();
        $faturadoStatus = (new FaturadoStatus())->getStatus();
        $entregueStatus = (new EntregueStatus())->getStatus();
        $reprovado = (new RevisarStatusPedido())->getStatus();
        $canceladoStatus = (new CanceladoStatus())->getStatus();

        $retroceder = (new PedidoRetrocederStatus());

        switch ($pedido->status) {
            case $lancadoStatus:
                $retroceder->lancado($id, $motivo);
                break;
            case $notaStatus:
                $retroceder->boleto($id, $motivo);
                break;
            case $pagamentoStatus:
                $retroceder->pagamento($id, $motivo);
                break;
            case $faturamentoStatus:
                $retroceder->faturando($id, $motivo);
                break;
            case $faturadoStatus:
                $retroceder->faturado($id, $motivo);
                break;
            case $entregueStatus:
                $retroceder->entregre($id, $motivo);
                break;
            case $reprovado:
                $retroceder->reprovado($id, $motivo);
                break;
            case $canceladoStatus:
                $retroceder->cancelado($id, $motivo);
                break;
        }
    }
}
