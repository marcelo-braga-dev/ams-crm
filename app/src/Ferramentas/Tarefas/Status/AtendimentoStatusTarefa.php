<?php

namespace App\src\Ferramentas\Tarefas\Status;

class AtendimentoStatusTarefa
{
    private string $status = 'atendimento';

    public function status()
    {
        return $this->status;
    }
}
