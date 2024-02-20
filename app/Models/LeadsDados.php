<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsDados extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'chave',
        'valor',
        'nome',
        'status',
    ];

    public function create($id, $chave, $valor = null, $nome = null)
    {
        $this->newQuery()
            ->create([
                'lead_id' => $id,
                'chave' => $chave,
                'valor' => $valor,
                'nome' => $nome,
            ]);
    }

    public function dados($id, $chave)
    {
        return $this->newQuery()
            ->where('lead_id', $id)
            ->where('chave', $chave)
            ->get()
            ->transform(function ($item) {
                return converterTelefone($item->valor);
            });
    }
}
