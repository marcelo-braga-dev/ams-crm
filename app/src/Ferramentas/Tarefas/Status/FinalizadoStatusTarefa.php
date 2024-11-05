<?php

namespace App\src\Ferramentas\Tarefas\Status;

class FinalizadoStatusTarefa
{
    private string $status = 'finalizado';

    public function status()
    {
        return $this->status;
    }
}
