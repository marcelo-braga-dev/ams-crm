<?php

namespace App\Services\Pedidos;

use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoRastreio;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoPrazoStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\FaturadoVistaStatus;

class StatusPedidosServices
{
    public function statusAguardandoFaturamendo()
    {
        return [
            (new AguardandoFaturamentoStatus())->getStatus(),
            (new FaturadoStatus())->getStatus(),
            (new FaturadoVistaStatus())->getStatus(),
            (new FaturadoPrazoStatus())->getStatus(),
            (new AguardandoRastreio())->getStatus(),
            (new AcompanhamentoStatus())->getStatus(),
            (new EntregueStatus())->getStatus(),
        ];
    }

    public function statusFaturados()
    {
        return [
            (new FaturadoStatus())->getStatus(),
            (new FaturadoVistaStatus())->getStatus(),
            (new FaturadoPrazoStatus())->getStatus(),
            (new AguardandoRastreio())->getStatus(),
            (new AcompanhamentoStatus())->getStatus(),
            (new EntregueStatus())->getStatus(),
        ];
    }
}
