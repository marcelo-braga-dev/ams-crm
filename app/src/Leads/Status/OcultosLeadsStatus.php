<?php

namespace App\src\Leads\Status;

use App\Models\Leads;

class OcultosLeadsStatus
{
    private string $status = 'oculto';

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getNome(): string
    {
        return '';
    }
    public function updateStatus($id): void
    {
        (new Leads())->updateStatus($id, $this->getStatus());
    }
}
