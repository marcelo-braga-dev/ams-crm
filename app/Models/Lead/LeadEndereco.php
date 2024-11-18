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

    protected $appends = ['cidade_estado'];

    public function getCidadeEstadoAttribute()
    {
        return ($this->attributes['cidade'] ?? '-') . '/' . ($this->attributes['estado'] ?? '-');
    }
}
