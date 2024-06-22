<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosEstoquesHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'produto_id',
        'pedido_id',
        'tipo',
        'nota',
        'data',
        'qtd',
    ];

    public function createEntrada($dados)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'produto_id' => $dados->produto_id,
                'tipo' => 'entrada',
                'nota' => $dados->nota,
                'data' => $dados->data,
                'qtd' => $dados->qtd,
            ]);
    }

    public function createSaida($idPedido, $idProduto, $qtd)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'produto_id' => $idProduto,
                'pedido_id' => $idPedido,
                'tipo' => 'saida',
                'data' => now(),
                'qtd' => $qtd,
            ]);
    }

    public function gets($id)
    {
        return $this->newQuery()
            ->leftJoin('produtos', 'produtos_estoques_historicos.produto_id', '=', 'produtos.id')
            ->leftJoin('users', 'produtos_estoques_historicos.user_id', '=', 'users.id')
            ->where('produto_id', $id)
            ->selectRaw('produtos_estoques_historicos.*, users.name AS autor, produtos.nome AS produtos_nome')
            ->get()
            ->transform(function ($item) {
                $item->data = date('d/m/Y', strtotime($item->data));
                return $item;
            });
    }
}
