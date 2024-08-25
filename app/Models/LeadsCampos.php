<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsCampos extends Model
{
    use HasFactory;

    protected $fillable = [
        'franquia_id',
        'nome',
        'is_requerido',
        'sequencia',
        'is_default',
    ];
}
