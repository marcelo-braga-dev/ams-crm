<?php

namespace App\Models\Financeiro;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FluxoCaixaPagamento extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fluxo_caixa_id',
        'valor',
        'data',
        'banco_id',
        'valor_baixa',
        'data_baixa',
        'forma_pagamento',
    ];

    protected function getDataAttribute()
    {
        return $this->attributes['data'] ? Carbon::parse($this->attributes['data'])->format('d/m/Y H:i:s') : null;
    }

    protected function getDataBaixaAttribute()
    {
        return $this->attributes['data_baixa'] ? Carbon::parse($this->attributes['data_baixa'])->format('d/m/Y H:i:s') : null;
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->select('id', 'name as nome');
    }

    public function cadastrar($id, $dados)
    {
        $insert = [];
        foreach ($dados as $value) {
            $insert[] = [
                'user_id' => id_usuario_atual(),
                'fluxo_caixa_id' => $id,
                'valor' => convert_money_float($value['valor'] ?? null),
                'data' => $value['data'] ?? null,
                'banco_id' => $value['banco'] ?? null,
                'valor_baixa' => $value['valor_baixa'] ?? null,
                'data_baixa' => $value['data_baixa'] ?? null,
                'forma_pagamento' => $value['forma_pagamento'] ?? null,
            ];
        }

        $this->insert($insert);
    }
}
