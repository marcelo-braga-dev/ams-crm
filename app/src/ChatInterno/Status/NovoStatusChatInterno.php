<?php

namespace App\src\ChatInterno\Status;

class NovoStatusChatInterno
{
    private string $status = 'novo';

    public function getStatus()
    {
        return $this->status;
    }
}
