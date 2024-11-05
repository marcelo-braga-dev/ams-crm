<?php

namespace App\Services\Leads\Relatorios;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;

class ConsultoresService
{
    public function qtdLeadsStatus($idConsultor)
    {
        return (new LeadsANTIGO())->qtdLeadsStatusConsultor($idConsultor);
    }

    public function qtdAtendimentoTipo($idConsultor)
    {
        return (new LeadsHistoricos())->qtdAtendimentoTipo($idConsultor);
    }

    public function meioContato($idConsultor)
    {
        return (new LeadsHistoricos())->qtdMeioContato($idConsultor);
    }
}
