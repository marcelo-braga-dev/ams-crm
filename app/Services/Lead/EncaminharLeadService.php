<?php

namespace App\Services\Lead;

use App\Models\Lead\LeadStatusHistoricos;
use App\Repositories\Lead\LeadEncaminharRepository;
use App\Services\Ferramentas\Whatsapp\UpdateUserContactWhatsappService;
use App\Services\Lead\Revisar\AlterarConsultorService;
use App\src\Leads\StatusLeads\OportunidadeStatusLead;
use App\src\Leads\StatusLeads\SuperOporunidadeStatusLead;

class EncaminharLeadService
{
    public function encaminharOportunidade(array $leads, ?int $consultorId)
    {
        $erroLeads = [];
        $consultorId = $consultorId === 0 ? null : $consultorId;

        foreach ($leads as $leadId) {
            try {
                if ($consultorId) {
                    $lastUser = (new LeadStatusHistoricos())->newQuery()
                        ->where('lead_id', $leadId)
                        ->whereIn('status', [(new OportunidadeStatusLead())->getStatus(), (new SuperOporunidadeStatusLead())->getStatus()])
                        ->orderByDesc('id')
                        ->value('user_id');

                    if ($consultorId == $lastUser) {
                        $erroLeads[] = $leadId;
                        continue;
                    }
                }

                (new UpdateStatusLeadService($leadId))->setOportunidadeStatus();
                (new AlterarConsultorService())->alterar($leadId, $consultorId);
                (new UpdateUserContactWhatsappService())->update($leadId, $consultorId);
            } catch (\Exception $exception) {
                print_pre($exception->getMessage());
                $erroLeads[] = $leadId;
            }
            }

        (new LeadEncaminharRepository())->armazenarHistorico($consultorId, $leads);

        if (!empty($erroLeads)) {
            $erroIds = implode(', #', $erroLeads);
            return "Este consultor(a) foi o último a atender este lead de ID: #$erroIds";
        }

        return null;
    }
    }
