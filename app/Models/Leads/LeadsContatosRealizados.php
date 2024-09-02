<?php

namespace App\Models\Leads;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsContatosRealizados extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'numero_id',
        'mensagem',
        'origem',
    ];

    public function store($leadId, $telefoneId, $mensagem, $origem)
    {
        $this->newQuery()->updateOrCreate([
            'user_id' => id_usuario_atual(),
            'lead_id' => $leadId,
            'numero_id' => 47971,
            'mensagem' => $mensagem,
            'origem' => 'whatsapp',
        ]);
    }
}
