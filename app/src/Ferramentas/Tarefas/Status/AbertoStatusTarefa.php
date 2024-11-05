<?php

namespace App\src\Ferramentas\Tarefas\Status;

class AbertoStatusTarefa
{
    private string $status = 'aberto';
    public function status()
    {
        return $this->status;
    }
}
