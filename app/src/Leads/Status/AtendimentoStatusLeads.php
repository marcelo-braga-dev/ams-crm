<?php

namespace App\src\Leads\Status;

use App\Models\Leads;
use App\Models\LeadsStatusHistoricos;

class AtendimentoStatusLeads
{
    private string $status = 'atendimento';
    private string $cor = 'rgb(154, 205, 50)';
    public function getStatus()
    {
        return $this->status;
    }

    public function getCor()
    {
        return $this->cor;
    }

    public function getNome()
    {
        return 'Atendimento';
    }

    public function updateStatus($id)
    {
        (new Leads())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
