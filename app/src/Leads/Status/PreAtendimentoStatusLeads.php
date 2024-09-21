<?php

namespace App\src\Leads\Status;

use App\Models\Leads\LeadsANTIGO;
use App\Models\LeadsStatusHistoricos;

class PreAtendimentoStatusLeads
{
    private string $status = 'pre_atendimento';
    private string $cor = 'rgb(255, 165, 0)';

    public function getStatus()
    {
        return $this->status;
    }

    public function getCor()
    {
        return $this->cor;
    }

    public function getNome(): string
    {
        return 'Pré-Atendimento';
    }

    public function updateStatus($id)
    {
        (new LeadsANTIGO())->updateStatus($id, $this->getStatus());
        (new LeadsStatusHistoricos())->create($id, $this->status);
    }
}
