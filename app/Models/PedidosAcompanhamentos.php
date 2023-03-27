<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosAcompanhamentos extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'pedidos_id',
        'msg',
        'prazo',
    ];

    public function get($id)
    {
        $nomes = (new User())->getNomes();

        return $this->newQuery()
            ->where('pedidos_id', $id)
            ->get()
            ->transform(function ($dados) use ($nomes) {
                return [
                    'nome' => $nomes[$dados->users_id] ?? '',
                    'msg' => $dados->msg,
                    'prazo' => $dados->prazo,
                ];
            });
    }

    public function create($idPedido, $msg)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'pedidos_id' => $idPedido,
                'msg' => $msg
            ]);
    }
}
