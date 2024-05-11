<?php

namespace App\src\Chamados\Status;

use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;

class FinalizadosChamadoStatus implements ChamadosStatus
{
    private string $status = 'finalizado';

    function getStatus(): string
    {
        return $this->status;
    }

    function getNomeStatus(): string
    {
        return 'Finalizado';
    }

    function getPrazo(): int
    {
        return 2;
    }

    public function updateStatus(int $idPedido, int $idChamado, string $mensagem, $dados)
    {
        (new PedidosChamadosHistoricos())
            ->create($idPedido, $idChamado, $this->status, $mensagem, $this->getPrazo(), $dados);
        (new PedidosChamados())->updateStatus( $idChamado,  $this->getStatus(),  $this->getPrazo());
    }
}
