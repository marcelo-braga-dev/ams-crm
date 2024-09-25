<?php

namespace App\Repositories\Lead;

use App\DTO\Lead\LeadCreateDTO;
use App\Models\Lead\Lead;
use Illuminate\Support\Facades\DB;

class LeadRepositories
{
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
}
