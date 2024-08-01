<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceirosEmpresas extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'cnpj'
    ];

    public function create($dados)
    {
        $this::newQuery()
            ->create([
                'nome' => $dados['nome'],
                'cnpj' => $dados['cnpj']
            ]);
    }

    public function get()
    {
        return $this::query()
            ->get()
            ->transform(function ($item) {
                $item->cnpj = converterCNPJ($item->cnpj);
                return $item;
            });
    }

    public function atualizar($dados)
    {
        $this::newQuery()
            ->where('id', $dados['id'])
            ->update([
                'nome' => $dados['nome'],
                'cnpj' => $dados['cnpj']
            ]);
    }
}
