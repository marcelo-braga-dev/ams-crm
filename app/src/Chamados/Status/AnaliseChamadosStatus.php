<?php

namespace App\src\Chamados\Status;

class AnaliseChamadosStatus implements ChamadosStatus
{
    private string $status = 'analise';

    function getStatus(): string
    {
        return $this->status;
    }

    function getNomeStatus(): string
    {
        return 'Em análise';
    }

    function getPrazo(): int
    {
        return 1;
    }
}
