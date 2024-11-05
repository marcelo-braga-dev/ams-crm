<?php

namespace App\Models\Pedidos;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosAnotacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pedido_id',
        'mensagem'
    ];

    public function create($pedidoId, $mensagem)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'pedido_id' => $pedidoId,
                'mensagem' => $mensagem
            ]);
    }

    public function getDados($pedidoId)
    {
        return $this->newQuery()
            ->leftJoin('users', 'pedidos_anotacoes.user_id', '=', 'users.id')
            ->where('pedido_id', $pedidoId)
            ->get(['pedidos_anotacoes.*', 'users.name as nome', 'users.foto'])
            ->transform(function ($item) {
                $item->foto = url_arquivos($item->foto);
                $item->data = date('d/m/y H:i', strtotime($item->created_at));
                return $item;
            });
    }
}
