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
use App\src\Pedidos\Status\FaturadoPrazoStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\FaturadoVistaStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;

class CardDadosService
{
    public function getCards($id = null, ?int $fornecedorAtual = null, ?int $setorAtual = null): array
    {
        $reprovado = (new RevisarStatusPedido())->getStatus();
        $conferenciaStatus = (new ConferenciaStatusPedido())->getStatus();
        $lancadoStatus = (new LancadoStatus())->getStatus();
        $notaStatus = (new AguardandoNotaStatus())->getStatus();
        $pagamentoStatus = (new AguardandoPagamentoStatus())->getStatus();
        $faturamentoStatus = (new AguardandoFaturamentoStatus())->getStatus();
        $faturadoStatus = (new FaturadoStatus())->getStatus();
        $faturadoVistaStatus = (new FaturadoVistaStatus())->getStatus();
        $faturadoPrazoStatus = (new FaturadoPrazoStatus())->getStatus();
        $acompanhamentoStatus = (new AcompanhamentoStatus())->getStatus();
        $entregueStatus = (new EntregueStatus())->getStatus();
        $canceladoStatus = (new CanceladoStatus())->getStatus();
        $encomendaStatus = (new EncomendaStatus())->getStatus();

        $dados = (new Pedidos())->getPedidos($id, $setorAtual, $fornecedorAtual);

        $cards['reprovado'] = $this->getDadosCard($dados, $reprovado);
        $cards['conferencia'] = $this->getDadosCard($dados, $conferenciaStatus);
        $cards['lancado'] = $this->getDadosCard($dados, $lancadoStatus);
        $cards['nota'] = $this->getDadosCard($dados, $notaStatus);
        $cards['pagamento'] = $this->getDadosCard($dados, $pagamentoStatus);
        $cards['faturamento'] = $this->getDadosCard($dados, $faturamentoStatus);
        $cards['faturado_vista'] = $this->getDadosCard($dados, $faturadoVistaStatus);
        $cards['faturado_prazo'] = $this->getDadosCard($dados, $faturadoPrazoStatus);
        $cards['faturado'] = $this->getDadosCard($dados, $faturadoStatus);
        $cards['acompanhamento'] = $this->getDadosCard($dados, $acompanhamentoStatus);
        $cards['entregue'] = $this->getDadosCard($dados, $entregueStatus);
        $cards['cancelado'] = $this->getDadosCard($dados, $canceladoStatus);
        $cards['encomenda'] = $this->getDadosCard($dados, $encomendaStatus);
        $cards['total'] = $dados->count();

        return $cards;
    }

    private function getDadosCard($dados, $status)
    {
        return [...$dados->where('status', $status)];
    }
}
