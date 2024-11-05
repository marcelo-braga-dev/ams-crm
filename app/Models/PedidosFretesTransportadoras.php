<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosFretesTransportadoras extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome'
    ];

    public function get()
    {
        return $this->newQuery()
            ->get();
    }
}
