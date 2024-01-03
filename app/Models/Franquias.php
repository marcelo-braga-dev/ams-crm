<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Franquias extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'cor'
    ];

    public function get()
    {
        return $this->newQuery()
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'cor' => $item->cor
                ];
            });
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'cor' => $dados->cor
            ]);
    }

    static function getNomes(): array
    {
        $items = (new Franquias)->newQuery()
            ->get(['id', 'nome']);

        $res = [];
        foreach ($items as $item) {
            $res[$item->id] = $item->nome;
        }
        return $res;
    }

    public function find($id)
    {
        return $this->newQuery()
            ->find($id);
    }

    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $dados->nome,
                'cor' => $dados->cor
            ]);
    }
}
