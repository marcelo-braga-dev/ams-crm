<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosImagens;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\Pedidos\PedidosConsultorNotificar;

class AguardandoPagamentoStatus implements PedidosStatus
{
    private string $status = 'aguardando_pagamento';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getPagamento();
    }

    function getNomeStatus(): string
    {
        return 'Aguardando Pagamento';
    }

    function updateStatus($id, $alerta = null, $dataVencimento = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta);

        (new PedidosConsultorNotificar())->notificar($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }

    public function insertDadosStatus($id, $request)
    {
        (new Pedidos())->find($id)->update(['pagamento_vencimento_data' => $request->pagamento_vencimento_data]);
        (new PedidosImagens())->updateBoleto($id, $request);
    }
}
