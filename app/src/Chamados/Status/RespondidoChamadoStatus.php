<?php

namespace App\src\Chamados\Status;

use App\Models\PedidosChamados;
use App\Models\PedidosChamadosHistoricos;

class RespondidoChamadoStatus implements ChamadosStatus
{
    private string $status = 'respondido';

    function getStatus(): string
    {
        return $this->status;
    }

    function getNomeStatus(): string
    {
        return 'Respondido';
    }

    function getPrazo(): int
    {
        return 4;
    }

    public function responder(int $idPedido, int $idChamado, string $mensagem, $dados)
    {
        (new PedidosChamadosHistoricos())
            ->create($idPedido, $idChamado, $this->status, $mensagem, $this->getPrazo(), $dados);
        (new PedidosChamados())->updateStatus($idChamado, $this->status, $this->getPrazo());
    }
}
