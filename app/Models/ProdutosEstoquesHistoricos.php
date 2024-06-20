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
}
