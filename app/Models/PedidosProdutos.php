<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosProdutos extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'fornecedores_id',
        'produtos_id',
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
                        'pedido_id' => $idPedido,
                        'fornecedores_id' => $item['fornecedor_id'],
                        'produtos_id' => $item['id'],
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
        $isAdmin = is_admin();
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->get()
            ->transform(function ($item) use ($isAdmin) {
                return [
                    'id_pedido' => $item->pedidos_id,
                    'id_produto' => $item->produtos_id,
                    'fornecedores_id' => $item->fornecedores_id,
                    'nome' => $item->nome,
                    'preco_fornecedor' => $isAdmin ? convert_float_money($item->preco_fornecedor) : 0,
                    'preco_fornecedor_float' => $isAdmin ? $item->preco_fornecedor : 0,
                    'preco_venda' => convert_float_money($item->preco_venda),
                    'preco_venda_float' => $item->preco_venda,
                    'qtd' => $item->quantidade,
                    'unidade' => $item->unidade,
                    'desconto' => $item->desconto,
                    'foto' => $item->url_foto,
                ];
            });
    }

    public function getFaturamento($id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'produto_id' => $item->produtos_id,
                    'preco' => $item->preco_venda,
                ];
            });
    }
}
