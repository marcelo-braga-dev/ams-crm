<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pins extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'pedido_id',
    ];

    public function createLead($id)
    {
        $verificar = $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('lead_id', $id)
            ->exists();

        if ($verificar) $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('lead_id', $id)
            ->delete();
        else $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $id,
            ]);
    }

    public function createPedido($id)
    {
        $verificar = $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('pedido_id', $id)
            ->exists();

        if ($verificar) $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('pedido_id', $id)
            ->delete();
        else $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'pedido_id' => $id,
            ]);
    }
}
