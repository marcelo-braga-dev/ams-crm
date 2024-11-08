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
use App\src\Pedidos\Status\VencidoStatusPedido;

class CardDadosService
{
    public function getCards($id = null, ?int $fornecedorAtual = null, ?int $setorAtual = null, $leadCnpj = null, $usuario = null): array
    {
        $statusClasses = [
            'reprovado' => RevisarStatusPedido::class,
            'vencido' => VencidoStatusPedido::class,
            'conferencia' => ConferenciaStatusPedido::class,
            'lancado' => LancadoStatus::class,
            'nota' => AguardandoNotaStatus::class,
            'pagamento' => AguardandoPagamentoStatus::class,
            'faturamento' => AguardandoFaturamentoStatus::class,
            'faturado' => FaturadoStatus::class,
            'faturado_vista' => FaturadoVistaStatus::class,
            'faturado_prazo' => FaturadoPrazoStatus::class,
            'acompanhamento' => AcompanhamentoStatus::class,
            'entregue' => EntregueStatus::class,
            'cancelado' => CanceladoStatus::class,
            'encomenda' => EncomendaStatus::class,
        ];

        $dados = (new Pedidos())->getPedidos($id, $setorAtual, $fornecedorAtual, $leadCnpj, $usuario);

        $cards = [];
        foreach ($statusClasses as $key => $class) {
            $status = (new $class())->getStatus();
            $cards[$key] = $this->getDadosCard($dados, $status);
        }
        $cards['total'] = $dados->count();

        return $cards;
    }

    private function getDadosCard($dados, $status)
    {
        return [...$dados->where('status', $status)];
    }
}
