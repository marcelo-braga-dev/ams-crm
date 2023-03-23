<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setores extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome'
    ];

    public function get()
    {
        return $this->newQuery()->get();
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->nome
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
                'nome' => $request->nome
            ]);
    }

    public function nomes()
    {
        $items = $this->newQuery()->get();
        $dados = [];

        foreach ($items as $item) {
            $dados[$item->id] = [
                'id' => $item->id,
                'nome' => $item->nome
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
                'nome' => $item->nome
            ];
        }

        return $dados;
    }
}
