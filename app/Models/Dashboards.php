<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dashboards extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'codigo',
        'franquias',
        'funcoes',
        'usuarios',
    ];

    public function create($dados)
    {
        $franquias = [];
        if ($dados->franquias) foreach ($dados->franquias as $id => $item) {
            if ($item) $franquias[] = $id;
        }

        $funcoes = [];
        if ($dados->funcoes) foreach ($dados->funcoes as $id => $item) {
            if ($item) $funcoes[] = $id;
        }

        $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'codigo' => $dados->codigo,
                'franquias' => $franquias ? serialize($franquias) : null,
                'funcoes' => $funcoes ? serialize($funcoes) : null,
            ]);
    }

    public function graficos()
    {
        $items = $this->newQuery()
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'codigo' => $item->codigo,
                    'data_cadastro' => date('d/m/y H:i', strtotime($item->created_at)),
                    'franquias' => $item->franquias ? unserialize($item->franquias) : [],
                    'funcoes' => $item->funcoes ? unserialize($item->funcoes) : [],
                ];
            });

        $funcao = funcao_usuario_atual();
        if ($funcao === 'admin') return $items;

        $dados = [];
        foreach ($items as $item) {
            if (in_array($funcao, $item['funcoes']) || !count($item['funcoes'])) $dados[] = $item;
        }
        return $dados;
    }

    public function excluir($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
    }

    public function todosGraficos()
    {
        return $this->newQuery()
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'codigo' => $item->codigo,
                    'data_cadastro' => date('d/m/y H:i', strtotime($item->created_at)),
                    'franquias' => $item->franquias ? unserialize($item->franquias) : [],
                    'funcoes' => $item->funcoes ? unserialize($item->funcoes) : [],
                ];
            });
    }
}
