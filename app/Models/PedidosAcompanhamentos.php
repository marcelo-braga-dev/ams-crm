<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosAcompanhamentos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pedido_id',
        'msg',
        'prazo',
    ];

    public function get($id)
    {
        $nomes = (new User())->getNomes();

        return $this->newQuery()
            ->where('pedido_id', $id)
            ->get()
            ->transform(function ($dados) use ($nomes) {
                return [
                    'nome' => $nomes[$dados->user_id] ?? '',
                    'msg' => $dados->msg,
                    'data' => date('d/m/Y H:i', strtotime($dados->created_at)),
                    'prazo' => $dados->prazo,
                ];
            });
    }

    public function create($idPedido, $msg)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'pedido_id' => $idPedido,
                'msg' => $msg
            ]);
    }
}
