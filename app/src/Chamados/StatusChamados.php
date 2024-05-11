<?php

namespace App\src\Chamados;

use App\src\Chamados\Status\AnaliseChamadosStatus;
use App\src\Chamados\Status\FinalizadosChamadoStatus;
use App\src\Chamados\Status\NovoChamadoStatus;
use App\src\Chamados\Status\RespondidoChamadoStatus;

class StatusChamados
{
    public function getStatus(): array
    {
        $novo = (new NovoChamadoStatus());
        $analise = (new AnaliseChamadosStatus());
        $respondido = (new RespondidoChamadoStatus());
        $finalizado = (new FinalizadosChamadoStatus());

        return [
            $novo->getStatus() => $novo->getNomeStatus(),
            $analise->getStatus() => $analise->getNomeStatus(),
            $respondido->getStatus() => $respondido->getNomeStatus(),
            $finalizado->getStatus() => $finalizado->getNomeStatus()
        ];
    }

    public function getNomeStatus(string $status): string
    {
        return $this->getStatus()[$status];
    }
}
