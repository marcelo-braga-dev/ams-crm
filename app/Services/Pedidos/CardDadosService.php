<?php

namespace App\Services\Pedidos;

use App\Models\Pedidos;
use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\Status\EncomendaStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;

class CardDadosService
{
    // Retorna todos os cards
    public function getCards($id = null, ?int $fornecedorAtual = null, ?int $setorAtual = null): array
    {
        $reprovado = (new RevisarStatusPedido())->getStatus();
        $conferenciaStatus = (new ConferenciaStatusPedido())->getStatus();
        $lancadoStatus = (new LancadoStatus())->getStatus();
        $notaStatus = (new AguardandoNotaStatus())->getStatus();
        $pagamentoStatus = (new AguardandoPagamentoStatus())->getStatus();
        $faturamentoStatus = (new AguardandoFaturamentoStatus())->getStatus();
        $faturadoStatus = (new FaturadoStatus())->getStatus();
        $acompanhamentoStatus = (new AcompanhamentoStatus())->getStatus();
        $entregueStatus = (new EntregueStatus())->getStatus();
        $canceladoStatus = (new CanceladoStatus())->getStatus();
        $encomendaStatus = (new EncomendaStatus())->getStatus();

        $configs = [
            'fornecedor' => $fornecedorAtual,
            'setor' => $setorAtual
        ];

        $objeto = (new DadosPedidoServices());
        $query = (new Pedidos());

        $cards['reprovado'] = $query->getPeloStatus($id, $reprovado, $configs, $objeto);
        $cards['conferencia'] = $query->getPeloStatus($id, $conferenciaStatus, $configs, $objeto);
        $cards['lancado'] = $query->getPeloStatus($id, $lancadoStatus, $configs, $objeto);
        $cards['nota'] = $query->getPeloStatus($id, $notaStatus, $configs, $objeto);
        $cards['pagamento'] = $query->getPeloStatus($id, $pagamentoStatus, $configs, $objeto);
        $cards['faturamento'] = $query->getPeloStatus($id, $faturamentoStatus, $configs, $objeto);
        $cards['faturado'] = $query->getPeloStatus($id, $faturadoStatus, $configs, $objeto);
        $cards['acompanhamento'] = $query->getPeloStatus($id, $acompanhamentoStatus, $configs, $objeto);
        $cards['entregue'] = $query->getPeloStatus($id, $entregueStatus, $configs, $objeto);
        $cards['cancelado'] = $query->getPeloStatus($id, $canceladoStatus, $configs, $objeto);
        $cards['encomenda'] = $query->getPeloStatus($id, $encomendaStatus, $configs, $objeto);

        return $cards;
    }
}
