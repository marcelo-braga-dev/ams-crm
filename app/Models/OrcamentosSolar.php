<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrcamentosSolar extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'kit_id',
        'tensao'
    ];

    public function create($dados)
    {
        $dados = $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $dados->lead_id,
                'kit_id' => $dados->kit_id,
                'tensao' => $dados->tensao
            ]);

        return $dados->id;
    }
}
