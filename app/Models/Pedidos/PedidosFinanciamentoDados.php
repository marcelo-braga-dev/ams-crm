<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFinanciamentoDados extends Model
{
    use HasFactory;

    protected $fillable = [
        'pedido_id',
        'banco',
        'gerente_nome',
        'gerente_telefone',
        'gerente_email',
    ];

    public function create($idPeddo, $dados)
    {
        $this->newQuery()
            ->create([
                'pedido_id' => $idPeddo,
                'banco' => $dados['banco'],
                'gerente_nome' => $dados['gerente'],
                'gerente_telefone' => converterInt($dados['telefone']),
                'gerente_email' => $dados['email'],
            ]);
    }

    public function getDados($idPedido)
    {
        return $this->newQuery()
            ->where('pedido_id', $idPedido)
            ->first();
    }
}
