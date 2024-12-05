<?php

namespace App\Models\Lead;

use Illuminate\Database\Eloquent\Model;

class LeadEndereco extends Model
{
    protected $fillable = [
        'lead_id',
        'cep',
        'rua',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado'
    ];

    protected $appends = ['cidade_estado', 'endereco_completo', 'endereco_padrao'];

    public function getCidadeEstadoAttribute()
    {
        return ($this->attributes['cidade'] ?? '-') . '/' . ($this->attributes['estado'] ?? '-');
    }

    protected function setCepAttribute($value)
    {
        $this->attributes['cep'] = converterInt($value);
    }

    public function getEnderecoCompletoAttribute()
    {
        $enderecoCompleto = '';

        if ($this->attributes['rua']) $enderecoCompleto .= 'RUA/AV: ' . $this->attributes['rua'];
        if ($this->attributes['numero']) $enderecoCompleto .= ' | NÚMERO: ' . $this->attributes['numero'];
        if ($this->attributes['complemento']) $enderecoCompleto .= ' | COMPLEMENTO: ' . $this->attributes['complemento'];
        if ($this->attributes['bairro']) $enderecoCompleto .= ' | BAIRRO: ' . $this->attributes['bairro'];
        if ($this->attributes['cidade']) $enderecoCompleto .= ' | CIDADE: ' . $this->attributes['cidade'];
        if ($this->attributes['estado']) $enderecoCompleto .= ' | ESTADO: ' . $this->attributes['estado'];
        if ($this->attributes['cep']) $enderecoCompleto .= ' | CEP: ' . $this->attributes['cep'];

        return $enderecoCompleto;
    }

    public function getEnderecoPadraoAttribute()
    {
        $enderecoCompleto = '';

        if ($this->attributes['rua']) $enderecoCompleto .= '' . $this->attributes['rua'];
        if ($this->attributes['numero']) $enderecoCompleto .= ', ' . $this->attributes['numero'];
        if ($this->attributes['complemento']) $enderecoCompleto .= ', ' . $this->attributes['complemento'];
        if ($this->attributes['bairro']) $enderecoCompleto .= ' - ' . $this->attributes['bairro'];
        if ($this->attributes['cidade']) $enderecoCompleto .= ', ' . $this->attributes['cidade'];
        if ($this->attributes['estado']) $enderecoCompleto .= ' - ' . $this->attributes['estado'];
        if ($this->attributes['cep']) $enderecoCompleto .= ', ' . $this->attributes['cep'];

        return $enderecoCompleto;
    }
}
