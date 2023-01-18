<?php

namespace App\src\Chamados\Status;

use App\Models\PedidosChamados;

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

    public function updateStatus($id)
    {
        (new PedidosChamados())->updateStatus( $id,  $this->getStatus(),  $this->getPrazo());
    }
}
