<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsEncaminhados extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_encaminhado',
        'lead_id',
    ];

    public function create($id, $idLead)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'user_encaminhado' => $id,
                'lead_id' => $idLead,
            ]);
    }

    public function ultimoVendedorEnviado()
    {
        return $this->newQuery()
            ->orderByDesc('id')
            ->first('user_encaminhado')['user_encaminhado'] ?? null;
    }
}
