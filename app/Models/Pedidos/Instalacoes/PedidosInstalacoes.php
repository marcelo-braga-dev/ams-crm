<?php

namespace App\Models\Pedidos\Instalacoes;

use App\Http\Resources\Pedido\PedidosCardsResource;
use App\Http\Resources\Pedido\PedidosInstalacoesResource;
use App\Models\Pedidos;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class PedidosInstalacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pedido_id'
    ];

    public function getDataCriacaoAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y H:i:s');
    }

    public function pedido(): BelongsTo
    {
        return $this->belongsTo(Pedidos::class, 'pedido_id');
    }

    public function anotacoes(): HasMany
    {
        return $this->hasMany(PedidosInstalacoesAnotacoes::class, 'instalacao_id', 'id')->with('autor');
    }

    public function cadastrar($pedidoId)
    {
        $this->newQuery()->updateOrCreate([
            'user_id' => id_usuario_atual(),
            'pedido_id' => $pedidoId,
        ]);
    }

    public function getPedidosCards()
    {
        return $this->with('pedido.cliente')->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'pedido_id' => $item->pedido->id,
                    'cliente' => $item->pedido->cliente->nome,
                    'data_criacao' => $item->data_criacao
                ];
            });
    }

    public function getAnotacoes($id)
    {
        return $this->with(['pedido', 'anotacoes.anexos'])
            ->where('id', $id)
            ->first();
    }
}
