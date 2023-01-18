<?php

namespace App\src\Pedidos\Status;

use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use App\src\Pedidos\Notificacoes\PedidosAdminsNotificar;
use App\src\Pedidos\Notificacoes\PedidosConsultorNotificar;
use App\src\Pedidos\SituacaoPedido;

class AguardandoNotaStatus implements PedidosStatus
{
    private string $status = 'aguardando_nota';

    function getStatus(): string
    {
        return $this->status;
    }

    function getPrazo(): int
    {
        return (new PedidosPrazos())->getBoleto();
    }

    function getNomeStatus(): string
    {
        return 'Aguardando Nota/Boleto';
    }

    function update(int $id, $preco_custo)
    {
        (new Pedidos())->newQuery()
            ->find($id)->update([
                'preco_custo' => $preco_custo,
                'status' => $this->getStatus(),
                'status_data' => now(),
                'prazo' => $this->getPrazo(),
                'situacao' => (new SituacaoPedido())->getNovoTag()
            ]);
    }

    function updateStatus($id, $alerta = null)
    {
        (new Pedidos())->updateStatus($id, $this->getStatus(), $this->getPrazo(), $alerta);

        (new PedidosConsultorNotificar())->notificarUpdateStatus($id, $this->getNomeStatus());
        (new PedidosAdminsNotificar())->notificar($id, $this->getNomeStatus());
    }

    public function insertDadosStatus(int $id, float $precoCusto)
    {
        (new Pedidos())->insertPrecoCusto($id, $precoCusto);
    }
}
