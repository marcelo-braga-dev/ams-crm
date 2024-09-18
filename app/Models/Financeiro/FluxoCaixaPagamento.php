<?php

namespace App\Models\Financeiro;

use App\Models\FluxoCaixasConfig;
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

    protected $appends = ['status', 'vencido'];
    protected $with = ['banco'];

    public function pagar($dados)
    {
        $this->find($dados->pagamento_id)
            ->update([
                'forma_pagamento' => $dados->forma_pagamento,
                'banco_id' => $dados->banco,
                'data_baixa' => $dados->data_baixa,
                'valor_baixa' => $dados->valor_baixa,
            ]);
    }

    // Attributes
    protected function setValorBaixaAttribute($value)
    {
        $this->attributes['valor_baixa'] = convert_money_float($value);
    }

    protected function getDataAttribute()
    {
        return $this->attributes['data'] ? Carbon::parse($this->attributes['data'])->format('d/m/Y') : null;
    }

    protected function getDataBaixaAttribute()
    {
        return $this->attributes['data_baixa'] ? Carbon::parse($this->attributes['data_baixa'])->format('d/m/Y') : null;
    }

    public function getStatusAttribute()
    {
        return ($this->attributes['data_baixa'] ?? null) ? 'pago' : 'aberto';
    }

    public function getVencidoAttribute()
    {
        $dataVencimento = $this->attributes['data'];
        if ($dataVencimento) {
            $diasVencidos = Carbon::now()->diffInDays(Carbon::parse($dataVencimento));
            return intval($diasVencidos);
        }
        return null;
    }

    // Relations
    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->select('id', 'name as nome');
    }

    public function banco()
    {
        return $this->belongsTo(FluxoCaixasConfig::class, 'banco_id', 'id');
    }

    public function notaFiscal()
    {
        return $this->belongsTo(FluxoCaixa::class, 'fluxo_caixa_id', 'id');
    }

    // Metodos
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

    public function getAll()
    {
        return $this->with('notaFiscal');
    }
}
