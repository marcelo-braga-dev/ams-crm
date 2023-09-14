<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produtos extends Model
{
    use HasFactory;

    protected $fillable = [
        'fornecedores_id',
        'nome',
        'preco_fornecedor',
        'preco_venda',
        'unidade'
    ];

    public function getProdutos($id)
    {
        return $this->newQuery()
            ->where('fornecedores_id', $id)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($dados) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
                    'preco_venda' => convert_float_money($dados->preco_venda),
                    'preco_venda_float' => $dados->preco_venda,
                    'unidade' => $dados->unidade,
                ];
            });
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'fornecedores_id' => $dados->fornecedor,
                'nome' => $dados->nome,
                'preco_fornecedor' => $dados->preco_fornecedor,
                'preco_venda' => $dados->preco_venda,
                'unidade' => $dados->unidade,
            ]);
    }

    public function find($id)
    {
        $dados = $this->newQuery()->find($id);

        return [
            'id' => $dados->id,
            'nome' => $dados->nome,
            'fornecedores_id' => $dados->fornecedores_id,
            'preco_fornecedor' => convert_float_money($dados->preco_fornecedor),
            'preco_venda' => convert_float_money($dados->preco_venda),
            'unidade' => $dados->unidade,
        ];
    }

    public function atualizar($id, $dados)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $dados->nome,
                'preco_fornecedor' => convert_money_float($dados->preco_fornecedor),
                'preco_venda' => convert_money_float($dados->preco_venda),
                'unidade' => $dados->unidade,
            ]);
    }

    public function excluir($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
    }
}
