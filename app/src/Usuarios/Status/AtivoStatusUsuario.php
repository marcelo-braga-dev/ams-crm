<?php

namespace App\src\Usuarios\Status;

class AtivoStatusUsuario
{
    private string $status = 'ativo';

    public function getStatus()
    {
        return $this->status;
    }
}
