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
                $produto = (new Produtos())->newQuery()->find($item['id']);

                (new Produtos())->subtrairEstoque($idPedido, $item['id'], $item['qtd']);

                $this->newQuery()
                    ->create([
                        'pedido_id' => $idPedido,
                        'fornecedores_id' => $produto->fornecedor_id,
                        'produtos_id' => $produto->id,
                        'nome' => $produto->nome,
                        'desconto' => $item['desconto'] ?? '',
                        'preco_venda' => $produto->preco_venda,
                        'preco_fornecedor' => $produto->preco_fornecedor,
                        'quantidade' => $item['qtd'],
                        'unidade' => $item['und'] ?? '',
                        'url_foto' => $produto->url_foto,
                    ]);
            }
        }
    }

    public function getProdutosPedido($id)
    {
        $isFinanceiro = is_financeiro();
        return $this->newQuery()
            ->leftJoin('produtos_fornecedores', 'pedidos_produtos.fornecedores_id', '=', 'produtos_fornecedores.id')
            ->where('pedido_id', $id)
            ->select([
                'pedidos_produtos.*',
                'produtos_fornecedores.nome AS fornecedor_nome'
            ])
            ->get()
            ->transform(function ($item) use ($isFinanceiro) {
                return [
                    'id_pedido' => $item->pedidos_id,
                    'id_produto' => $item->produtos_id,
                    'fornecedor_id' => $item->fornecedores_id,
                    'nome' => $item->nome,
                    'preco_fornecedor' => $isFinanceiro ? $item->preco_fornecedor : 0,
                    'preco_venda' => $item->preco_venda,
                    'preco_liquido' => $item->preco_venda - $item->desconto,
                    'lucro' => $isFinanceiro ? ($item->preco_venda - $item->preco_fornecedor - $item->desconto) : 0,
                    'qtd' => $item->quantidade,
                    'unidade' => $item->unidade,
                    'desconto' => $item->desconto,
                    'foto' => url_arquivos($item->url_foto),
                    'fornecedor_nome' => $item->fornecedor_nome,
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

    public function setPrecoCustoPedido($id)
    {
        $valor =  $this->newQuery()
            ->where('pedido_id', $id)
            ->selectRaw('SUM(preco_fornecedor * quantidade) AS total_custo')
            ->value('total_custo');

        (new Pedidos())->insertPrecoCusto($id, $valor);
    }
}
