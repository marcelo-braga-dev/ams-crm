<?php

namespace App\src\ChatInterno\Status;

class LidaStatusChatInterno
{
    private string $status = 'lida';

    public function getStatus()
    {
        return $this->status;
    }
}
