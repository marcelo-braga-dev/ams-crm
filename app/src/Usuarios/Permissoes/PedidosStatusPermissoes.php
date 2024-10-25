<?php

namespace App\src\Usuarios\Permissoes;

use App\src\Leads\StatusLeads\CotacaoEnviadoStatusLead;
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

class PedidosStatusPermissoes extends ChavesPermissoes
{


    public function permissoesStatusLeads(): array
    {
        return [
            $this->chavePedidosStatusReprovado(),
            $this->chavePedidosStatusEncomenda(),
            $this->chavePedidosStatusConferencia(),
            $this->chavePedidosStatusLancado(),
            $this->chavePedidosStatusAguardandoNota(),
            $this->chavePedidosStatusAguardandoPagamento(),
            $this->chavePedidosStatusAguaradandoFaturamento(),
            $this->chavePedidosStatusFaturado(),
            $this->chavePedidosStatusFaturadoVista(),
            $this->chavePedidosStatusFaturadoPrazo(),
            $this->chavePedidosStatusAcompanhamento(),
            $this->chavePedidosStatusEntregue(),
            $this->chavePedidosStatusCancelados(),
        ];
    }

    public function permissoesStatus($status): string
    {
        $items = [
            $this->chavePedidosStatusReprovado() => (new RevisarStatusPedido())->getStatus(),
            $this->chavePedidosStatusEncomenda() => (new EncomendaStatus())->getStatus(),
            $this->chavePedidosStatusConferencia() => (new ConferenciaStatusPedido())->getStatus(),
            $this->chavePedidosStatusLancado() => (new LancadoStatus())->getStatus(),
            $this->chavePedidosStatusAguardandoNota() => (new AguardandoNotaStatus())->getStatus(),
            $this->chavePedidosStatusAguardandoPagamento() => (new AguardandoPagamentoStatus())->getStatus(),
            $this->chavePedidosStatusAguaradandoFaturamento() => (new AguardandoFaturamentoStatus())->getStatus(),
            $this->chavePedidosStatusFaturado() => (new FaturadoStatus())->getStatus(),
            $this->chavePedidosStatusFaturadoVista() => (new FaturadoVistaStatus())->getStatus(),
            $this->chavePedidosStatusFaturadoPrazo() => (new FaturadoPrazoStatus())->getStatus(),
            $this->chavePedidosStatusAcompanhamento() => (new AcompanhamentoStatus())->getStatus(),
            $this->chavePedidosStatusEntregue() => (new EntregueStatus())->getStatus(),
            $this->chavePedidosStatusCancelados() => (new CanceladoStatus())->getStatus(),
        ];

        return $items[$status];
    }
}
