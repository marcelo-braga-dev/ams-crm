<?php

namespace App\src\Pedidos;

use App\Models\Pedidos;
use App\Models\PedidosFaturados;
use App\Models\PedidosFaturamentos;
use App\Models\PedidosImagens;
use App\Services\Pedido\Valores\PrazoRastreioPedidoService;
use App\src\Pedidos\Arquivos\ArquivosPedido;
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

class PedidoUpdateStatus
{
    public function setConferencia($id, $alerta = null)
    {
        (new ConferenciaStatusPedido())->updateStatus($id, $alerta);
    }

    public function setLancado(int $id): void
    {
        (new LancadoStatus())->updateStatus($id);
    }

    public function setFaturado($id, $request): void
    {
        (new PedidosFaturados())->create($id, $request);
        (new PedidosImagens())->updateNotaFiscal($id, $request);
        (new FaturadoStatus())->updateStatus($id, null, $request->prazo);
        (new PrazoRastreioPedidoService())->atualizar($id, $request->prazo_rastreio);

        (new PedidosFaturamentos())->create($id);
    }

    public function setFaturadoVista($id): void
    {
        (new FaturadoVistaStatus())->updateStatus($id, null, 0);
        (new Pedidos())->dataPagamento($id);

        (new PedidosFaturamentos())->create($id);
    }

    public function setFaturadoPrazo($id): void
    {
        (new FaturadoPrazoStatus())->updateStatus($id, null, 0);
        (new Pedidos())->dataPagamento($id);
        (new PedidosFaturamentos())->create($id);
    }

    public function setEntregue($id, $pix = null): void
    {
        if ($pix) (new ArquivosPedido())->comprovantePix($id, $pix);
        (new EntregueStatus())->updateStatus($id);
    }

    public function setEncomenda($id, $prazo): void
    {
        (new EncomendaStatus())->updateStatus($id, null, $prazo);
    }

    public function setAguardandoFaturamento($id, $request): void
    {
        (new PedidosImagens())->updateRecibo($id, $request);
        (new AguardandoFaturamentoStatus())->updateStatus($id);
    }

    public function setAcompanhamento($id, $rastreioData = null)
    {
        (new AcompanhamentoStatus())->updateStatus($id, null);

        \App\Models\Pedido\Pedido::find($id)
            ->update(['rastreio_data' => $rastreioData]);
    }

    public function setAguardandoPagamento($id, $request)
    {
        (new AguardandoPagamentoStatus())->insertDadosStatus($id, $request);
        (new AguardandoPagamentoStatus())->updateStatus($id);
    }

    public function conferencia(int $id): void
    {
        (new LancadoStatus())->updateStatus($id);
    }

    public function reprovado(int $id, string $alerta): void
    {
        (new RevisarStatusPedido())->updateStatus($id, $alerta);
    }

    public function lancado(int $id, $precoCusto, $imposto)
    {
        (new AguardandoNotaStatus())->insertDadosStatus($id, $precoCusto, $imposto);
        (new AguardandoNotaStatus())->updateStatus($id);
    }

    public function aguardandoBoleto($id, $request)
    {

        (new AguardandoPagamentoStatus())->insertDadosStatus($id, $request);
        (new AguardandoPagamentoStatus())->updateStatus($id);
    }

    public function pagamento($id, $request)////
    {
        (new PedidosImagens())->updateRecibo($id, $request);
        (new AguardandoFaturamentoStatus())->updateStatus($id);
    }

    public function faturado($id, $msg)
    {
        (new AcompanhamentoStatus())->updateStatus($id, $msg);
    }

    public function cancelado($id, $request)
    {
        (new Pedidos)->estornarProdutos($id);

        (new CanceladoStatus())->updateStatus($id, $request->motivo);
    }

    public function acompanhamento($id, $alerta)
    {
        (new EntregueStatus())->updateStatus($id, $alerta);
    }
}
