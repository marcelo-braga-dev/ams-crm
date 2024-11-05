<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Franquias extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'cor',
        'cor_texto',
        'status'
    ];

    public function get()
    {
        return $this->newQuery()
            ->where('status', 1)
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'cor' => $item->cor,
                    'cor_texto' => $item->cor_texto,
                ];
            });
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->nome,
                'cor' => $dados->cor,
                'cor_texto' => $dados->cor_texto,
            ]);
    }

    static function getNomes()
    {
        return (new Franquias)->newQuery()
            ->pluck('nome', 'id');
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
                'cor' => $dados->cor,
                'cor_texto' => $dados->cor_texto,
            ]);
    }

    public function remover($id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => false]);
    }
}
