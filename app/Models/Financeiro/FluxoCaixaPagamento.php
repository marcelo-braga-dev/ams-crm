<?php

namespace App\Models\Financeiro;

use App\Models\FluxoCaixasConfig;
use App\Models\User;
use App\Services\UploadFiles;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FluxoCaixaPagamento extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'fluxo_caixa_id',
        'valor',
        'data',
        'banco_id',
        'valor_baixa',
        'data_baixa',
        'forma_pagamento',
        'anexo',
    ];

    protected $appends = ['status', 'vencido'];
    protected $with = ['banco'];

    // =======================
    // Atributos (Getters/Setters)
    // =======================
    protected function setValorAttribute($value)
    {
        $this->attributes['valor'] = convert_money_float($value);
    }

    protected function setValorBaixaAttribute($value)
    {
        $this->attributes['valor_baixa'] = convert_money_float($value);
    }

    protected function setAnexoAttribute($value)
    {
        $this->attributes['anexo'] = $this->uploadAnexo($value);
    }

    protected function setUserIdAttribute($value)
    {
        $this->attributes['user_id'] = id_usuario_atual();
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

    public function getAnexoAttribute()
    {
        return url_arquivos($this->attributes['data_baixa'] ?? null);
    }

    public function getVencidoAttribute()
    {
        if ($this->attributes['data']) {
            $dataVencimento = Carbon::parse($this->attributes['data']);

            return (Carbon::now()->diffInDays($dataVencimento));
        }
        return null;
    }

    // =======================
    // Relacionamentos
    // =======================
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

    // =======================
    // Métodos
    // =======================
    private function uploadAnexo($anexo)
    {
        if ($anexo) {
            return (new UploadFiles())->uploadFile($anexo, 'financeiro/fluxo_caixa/comprovantes');
        }
        return null;
    }

    public function getNotaFiscal()
    {
        return $this->with('notaFiscal');
    }
}
