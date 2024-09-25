<?php

namespace App\Models\LeadsDEPREECATED;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsContatosRealizados extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'telefone_id',
        'origem',
        'meta',
    ];

    public function store(int $leadId, int $telefoneId, ?string $origem, ?string $meta): void
    {
        $this->newQuery()->create([
            'user_id' => id_usuario_atual(),
            'lead_id' => $leadId,
            'telefone_id' => $telefoneId,
            'origem' => $origem,
            'meta' => $meta,
        ]);
    }
}
