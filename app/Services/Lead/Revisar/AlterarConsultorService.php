<?php

namespace App\Services\Lead\Revisar;

use App\Repositories\Lead\LeadRepository;

class AlterarConsultorService
{
    public function alterar(int $leadID, ?int $colsuntorId)
    {
        (new LeadRepository())->updateConsultor($leadID, $colsuntorId);
    }
}
