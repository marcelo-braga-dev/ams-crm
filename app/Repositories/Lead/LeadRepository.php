<?php

namespace App\Repositories\Lead;

use App\DTO\Lead\LeadCreateDTO;
use App\Models\Lead\Lead;
use App\Services\Lead\UpdateStatusLeadService;
use App\src\Leads\StatusLeads\StatusLeads;
use Illuminate\Support\Facades\DB;

class LeadRepository
{
    public function find($id)
    {
        return Lead::find($id);
    }

    public function create(LeadCreateDTO $createDTO)
    {
        try {
            DB::transaction(function () use ($createDTO) {
                Lead::create($createDTO->toArray());
            });
        } catch (\Exception $e) {
            throw new \DomainException('Falha no cadastro do Lead');
        }
    }

    public function updateStatus(int $leadId, StatusLeads $status)
    {
        return Lead::find($leadId)
            ->update(['status' => $status->getStatus()]);
    }

    public function updateConsultor(int $leadId, ?int $colsuntorId)
    {
        Lead::find($leadId)
            ->update(['user_id' => $colsuntorId]);
    }
}
