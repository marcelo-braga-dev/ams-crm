<?php

namespace App\Services\Pedidos\Cards;

use App\Models\Pedidos;
use App\Services\Pedidos\PedidosServices;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use DateTime;

class AdminCardsServices
{
    public function pedidos()
    {
        $pedidosAll = (new Pedidos())->newQuery()->orderByDesc('situacao')->get();
        return $this->pedidosStatus($pedidosAll);
    }

    public function pedidosUsuario(int $id)
    {
        $pedidosAll = (new Pedidos())->newQuery()
            ->where('users_id', $id)
            ->orderByDesc('situacao')->get();

        return $this->pedidosStatus($pedidosAll);
    }

    private function pedidosStatus($pedidosAll)
    {
        $novoStatus = (new RevisarStatusPedido())->getStatus();
        $conferenciaStatus = (new ConferenciaStatusPedido())->getStatus();
        $lancadoStatus = (new LancadoStatus())->getStatus();
        $notaStatus = (new AguardandoNotaStatus())->getStatus();
        $pagamentoStatus = (new AguardandoPagamentoStatus())->getStatus();
        $faturamentoStatus = (new AguardandoFaturamentoStatus())->getStatus();
        $faturadoStatus = (new FaturadoStatus())->getStatus();
        $entregueStatus = (new EntregueStatus())->getStatus();
        $canceladoStatus = (new CanceladoStatus())->getStatus();

        $pedidos['reprovado'] = [];
        $pedidos['conferencia'] = [];
        $pedidos['lancado'] = [];
        $pedidos['nota'] = [];
        $pedidos['pagamento'] = [];
        $pedidos['faturamento'] = [];
        $pedidos['faturado'] = [];
        $pedidos['entregue'] = [];
        $pedidos['cancelado'] = [];


        foreach ($pedidosAll as $dados) {
            $adminCardsServices = new PedidosServices();

            switch ($dados->status) {
                case $novoStatus :
                    $pedidos['reprovado'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $conferenciaStatus :
                    $pedidos['conferencia'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $lancadoStatus :
                    $pedidos['lancado'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $notaStatus :
                    $pedidos['nota'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $pagamentoStatus :
                    $pedidos['pagamento'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $faturamentoStatus :
                    $pedidos['faturamento'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $faturadoStatus :
                    $pedidos['faturado'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $entregueStatus :
                    $pedidos['entregue'][] = $adminCardsServices->pedidoCard($dados);
                    break;
                case $canceladoStatus :
                    $pedidos['cancelado'][] = $adminCardsServices->pedidoCard($dados);
                    break;
            }
            $clientes[$dados->id] = '';
        }

        return $pedidos;
    }
}
