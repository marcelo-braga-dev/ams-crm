<?php

namespace App\Services\Lead;

use App\Repositories\Lead\LeadRepository;

class AlterarConsultorService
{
    public function alterar(int $leadID, ?int $colsuntorId)
    {
        (new LeadRepository())->updateConsultor($leadID, $colsuntorId);
    }
}
