<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setores extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'cor',
        'franquia_id',
        'modelo'
    ];

    public function get()
    {
        $franquias = (new Franquias())->getNomes();

        return $this->newQuery()->get()
            ->transform(function ($item) use ($franquias) {
                return $this->dados($item, $franquias);
            });
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'cor' => $dados->cor,
                'franquia_id' => $dados->franquia,
                'modelo' => $dados->modelo
            ]);
    }

    public function find($id)
    {
        $item = $this->newQuery()
            ->find($id);
        if (!$item) return [];
        return $this->dados($item, Franquias::getNomes());
    }

    public function atualizar($id, $request)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $request->nome,
                'cor' => $request->cor,
                'franquia_id' => $request->franquia,
                'modelo' => $request->modelo
            ]);
    }

    public function getNomes(): array
    {
        $items = $this->newQuery()->get();
        $dados = [];

        foreach ($items as $item) {
            $dados[$item->id] = [
                'id' => $item->id,
                'nome' => $item->nome,
                'cor' => $item->cor
            ];
        }

        return $dados;
    }

    public function setores()
    {
        $items = $this->newQuery()->get();
        $dados = [];

        foreach ($items as $item) {
            $dados[] = $this->dados($item);
        }

        return $dados;
    }

    public function getNome()
    {
        return $this->newQuery()->pluck('nome', 'id');
    }

    public function getModelo($id)
    {
        return $this->newQuery()
            ->find($id)
            ->modelo ?? null;
    }

    private function dados($item, $franquias = [])
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'cor' => $item->cor,
            'franquia' => $franquias[$item->franquia_id] ?? '',
            'franquia_id' => $item->franquia_id,
            'modelo_id' => $item->modelo,
            'modelo' => $item->modelo == 1 ? 'Sem Produtos' : 'Com Produtos'
        ];
    }
}
