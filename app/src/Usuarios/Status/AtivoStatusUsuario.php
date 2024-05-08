<?php

namespace App\src\Usuarios\Status;

class AtivoStatusUsuario
{
    private string $status = '1';

    public function getStatus(): string
    {
        return $this->status;
    }
}
