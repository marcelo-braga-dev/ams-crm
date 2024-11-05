<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosIntegracoesHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'fornecedor_id',
        'qtd',
        'status',
    ];

    public function create($fornecedor, $qtd)
    {

    }
}
