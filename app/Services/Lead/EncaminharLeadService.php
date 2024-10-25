<?php

namespace App\Services\Lead;

use App\Models\Lead\LeadStatusHistoricos;
use App\src\Leads\StatusLeads\OportunidadeStatusLead;

class EncaminharLeadService
{
    public function encaminharOportunidade(array $leads, int $consultor)
    {
        $erroLeads = [];

        foreach ($leads as $leadId) {
            try {
                $lastUser = (new LeadStatusHistoricos())->newQuery()
                    ->where('lead_id', $leadId)
                    ->where('status', (new OportunidadeStatusLead())->getStatus())
                    ->orderByDesc('id')
                    ->value('user_id');

                if ($consultor == $lastUser) {
                    $erroLeads[] = $leadId;
                    continue;
                }

                (new UpdateStatusLeadService($leadId))->setOportunidadeStatus();
                (new AlterarConsultorService())->alterar($leadId, $consultor);
            } catch (\Exception) {
                $erroLeads[] = $leadId;
            }
        }

        if (!empty($erroLeads)) {
            $erroIds = implode(', #', $erroLeads);
            return "Este consultor(a) foi o último a atender este lead de ID: #$erroIds";
        }

        return null;
    }
}
