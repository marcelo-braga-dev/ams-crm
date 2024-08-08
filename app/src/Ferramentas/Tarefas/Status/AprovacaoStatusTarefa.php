<?php

namespace App\src\Ferramentas\Tarefas\Status;

class AprovacaoStatusTarefa
{
    private string $status = 'aprovacao';

    public function status()
    {
        return $this->status;
    }
}
