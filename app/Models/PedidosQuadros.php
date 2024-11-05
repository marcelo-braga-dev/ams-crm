<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosQuadros extends Model
{
    use HasFactory;

    protected $fillable = [
        'franquias_id',
        'setores_id',
        'ordem',
        'nome',
    ];

    public function get()
    {
        return $this->newQuery()
            ->orderBy('ordem')
            ->get();
    }
}
