<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosUnidades extends Model
{
    use HasFactory;

    protected $fillable = [
        'valor',
        'nome'
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'valor' => $dados['valor'],
                'nome' => $dados['nome'],
            ]);
    }

    public function get()
    {
        return $this->newQuery()
            ->orderBy('nome')
            ->orderBy('valor')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'valor' => $item->valor,
                ];
            });
    }

    public function getNomes(): array
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id] = $dado->valor . ' ' . $dado->nome;
        }

        return $dados;
    }
}
