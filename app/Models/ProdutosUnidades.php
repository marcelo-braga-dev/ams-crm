<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosUnidades extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome'
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados['nome'],
            ]);
    }

    public function get()
    {
        return $this->newQuery()
            ->get();
    }

    public function getNomes(): array
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id] = $dado->nome;
        }

        return $dados;
    }
}
