<?php

namespace App\Services\Pedidos;

use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoPrazoStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\FaturadoVistaStatus;

class StatusPedidosServices
{
    public function statusFaturados()
    {
        return [
            (new AguardandoFaturamentoStatus())->getStatus(),
            (new FaturadoStatus())->getStatus(),
            (new FaturadoVistaStatus())->getStatus(),
            (new FaturadoPrazoStatus())->getStatus(),
            (new AcompanhamentoStatus())->getStatus(),
            (new EntregueStatus())->getStatus(),
        ];
    }
}
