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
        'modelo'
    ];

    public function get()
    {
        return $this->newQuery()->get();
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'cor' => $dados->cor
            ]);
    }

    public function find($id)
    {
        return $this->newQuery()
            ->find($id);
    }

    public function atualizar($id, $request)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $request->nome,
                'cor' => $request->cor
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
            $dados[] = [
                'id' => $item->id,
                'nome' => $item->nome,
                'cor' => $item->cor
            ];
        }

        return $dados;
    }

    public function getNome()
    {
        $dados = $this->newQuery()->get();

        $res = [];
        foreach ($dados as $dado) {
            $res[$dado->id] = $dado->nome;
        }

        return $res;
    }

    public function getModelo($id)
    {
        return $this->newQuery()
            ->find($id)
            ->modelo ?? null;
    }
}
