<?php

namespace App\Models\Pedido;

use App\Models\User;
use App\src\Pedidos\StatusPedidos;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $fillable = ['prazo_rastreio'];

    protected $hidden = ['user_id', 'created_at', 'updated_at'];

    protected $with = ['consultor'];

    protected $appends = ['status_nome', 'pedido_data'];

    public function getStatusNomeAttribute()
    {
        return (new StatusPedidos())->getNomeStatus($this->attributes['status']);
    }

    public function getPedidoDataAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y H:i:s');
    }

    // =======================
    // Relacionamentos
    // =======================

    public function consultor()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
