<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosCategorias extends Model
{
    use HasFactory;

    protected $fillable = [
        'fornecedores_id',
        'nome'
    ];

    public function getFornecedor($id)
    {
        return $this->newQuery()
            ->where('fornecedores_id', $id)
            ->orderByDesc('id')
            ->get();
    }

    public function create($nome, $fornecedor)
    {
        $this->newQuery()
            ->create([
                'fornecedores_id' => $fornecedor,
                'nome' => $nome
            ]);
    }

    public function categoriasFornecedor($id)
    {
        return $this->newQuery()
            ->where('fornecedores_id', $id)
            ->get();
    }
}
