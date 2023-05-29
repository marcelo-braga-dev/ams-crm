<?php

namespace App\src\Chamados\Status;

use App\Models\PedidosChamados;
use App\Models\PedidosChamadosAnexos;
use App\Models\PedidosChamadosHistoricos;

class NovoChamadoStatus implements ChamadosStatus
{
    private string $status = 'novo';

    function getStatus(): string
    {
        return $this->status;
    }

    function getNomeStatus(): string
    {
        return 'Em aberto';
    }

    function getPrazo(): int
    {
        return 3;
    }

    public function create(int $idPedido, string $titulo, ?string $mensagem, $dados)
    {
        (new PedidosChamados())
            ->create($idPedido, $titulo, $this->status, $this->getPrazo(), $mensagem, $dados);
    }
}
