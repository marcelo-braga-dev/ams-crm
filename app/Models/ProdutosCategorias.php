<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosCategorias extends Model
{
    use HasFactory;

    protected $fillable = [
        'setores_id',
        'nome'
    ];

    public function find($id)
    {
        $setores = (new Setores())->getNomes();

        $dados = $this->newQuery()
            ->find($id);

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'setor' => $setores[$dados->setores_id]['nome'] ?? '',
            'setor_id' => $dados->setores_id,
        ];
    }

    public function create($nome, $setor)
    {
        $this->newQuery()
            ->create([
                'setores_id' => $setor,
                'nome' => $nome
            ]);
    }

    public function categoriasFornecedor($id)
    {

    }

    public function categorias($setorAtual = null)
    {
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery();

        if ($setorAtual) $query->where('setores_id', $setorAtual);

        return $query
            ->orderBy('setores_id')
            ->orderBy('nome')
            ->get()
            ->transform(function ($item) use ($setores) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'setor' => $setores[$item->setores_id]['nome'] ?? ''
                ];
            });
    }

    public function excluir($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
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
