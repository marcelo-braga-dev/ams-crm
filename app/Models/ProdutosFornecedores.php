<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosFornecedores extends Model
{
    use HasFactory;

    protected $fillable = [
      'nome',
      'setor_id',
      'franquia_id',
      'cnpj',
      'atendente',
      'telefone',
      'email',
      'anotacoes',
    ];

    public function create()
    {

    }

    public function gets()
    {
        return $this->newQuery()
            ->get();
    }
}
