<?php

namespace App\src\Usuarios\Status;

class BloqueadoUsuarioStatus
{
    private string $status = 'bloqueado';

    public function getStatus(): string
    {
        return $this->status;
    }
}
