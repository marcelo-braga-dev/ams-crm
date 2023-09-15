<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosProdutos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedidos_id',
        'fornecedores_id',
        'nome',
        'preco_fornecedor',
        'preco_venda',
        'quantidade',
        'unidade',
        'desconto',
        'url_foto',
    ];

    public function create($idPedido, $dados)
    {
        foreach ($dados->produtos as $item) {
            if ($item['qtd'] ?? null) {
                $this->newQuery()
                    ->create([
                        'pedidos_id' => $idPedido,
                        'fornecedores_id' => $dados->fornecedor,
                        'nome' => $item['nome'],
                        'desconto' => $item['desconto'] ?? '',
                        'preco_venda' => $item['preco_venda_float'],
                        'preco_fornecedor' => $item['preco_fornecedor_float'] ?? '',
                        'quantidade' => $item['qtd'],
                        'unidade' => $item['und'] ?? '',
                        'url_foto' => $item['foto'] ?? '',
                    ]);
            }
        }
    }

    public function getProdutosPedido($id)
    {
        return $this->newQuery()
            ->where('pedidos_id', $id)
            ->get()
            ->transform(function ($item) {
                return [
                    'nome' => $item->nome,
                    'preco_fornecedor' => convert_float_money($item->preco_fornecedor),
                    'preco_fornecedor_float' => $item->preco_fornecedor,
                    'preco_venda' => convert_float_money($item->preco_venda),
                    'preco_venda_float' => $item->preco_venda,
                    'qtd' => $item->quantidade,
                    'unidade' => $item->unidade,
                    'desconto' => $item->desconto,
                    'foto' => $item->url_foto,
                ];
            });
    }
}
