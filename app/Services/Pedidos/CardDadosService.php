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
        $faturadoVistaStatus = (new FaturadoVistaStatus())->getStatus();
        $faturadoPrazoStatus = (new FaturadoPrazoStatus())->getStatus();
        $acompanhamentoStatus = (new AcompanhamentoStatus())->getStatus();
        $entregueStatus = (new EntregueStatus())->getStatus();
        $canceladoStatus = (new CanceladoStatus())->getStatus();
        $encomendaStatus = (new EncomendaStatus())->getStatus();

        $objeto = (new DadosPedidoServices());
        $dados = (new Pedidos())->getPedidos($id, $setorAtual, $fornecedorAtual);

        $cards['reprovado'] = $this->getDadosCard($dados, $objeto, $reprovado);
        $cards['conferencia'] = $this->getDadosCard($dados, $objeto, $conferenciaStatus);
        $cards['lancado'] = $this->getDadosCard($dados, $objeto, $lancadoStatus);
        $cards['nota'] = $this->getDadosCard($dados, $objeto, $notaStatus);
        $cards['pagamento'] = $this->getDadosCard($dados, $objeto, $pagamentoStatus);
        $cards['faturamento'] = $this->getDadosCard($dados, $objeto, $faturamentoStatus);
        $cards['faturado_vista'] = $this->getDadosCard($dados, $objeto, $faturadoVistaStatus);
        $cards['faturado_prazo'] = $this->getDadosCard($dados, $objeto, $faturadoPrazoStatus);
        $cards['faturado'] = $this->getDadosCard($dados, $objeto, $faturadoStatus);
        $cards['acompanhamento'] = $this->getDadosCard($dados, $objeto, $acompanhamentoStatus);
        $cards['entregue'] = $this->getDadosCard($dados, $objeto, $entregueStatus);
        $cards['cancelado'] = $this->getDadosCard($dados, $objeto, $canceladoStatus);
        $cards['encomenda'] = $this->getDadosCard($dados, $objeto, $encomendaStatus);

        return $cards;
    }

    private function getDadosCard($dados, DadosPedidoServices $objeto, $status): array
    {
        $items = $dados->where('status', $status);
        $faturamento = convert_float_money($items->sum('preco_venda'));

        $res = [];
        foreach ($items as $dado) {
            $card = $objeto->dadosCard($dado, $faturamento);
            if ($card) $res[] = $card;
        }
        return $res;
    }
}
