<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosMarcas extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'tipo',
        'url_logo',
        'url_foto '
    ];

    public function create()
    {

    }

    public function getNomes()
    {
        return $this->newQuery()->pluck('nome', 'id');
    }

    public function marcasId()
    {
        return $this->newQuery()->pluck('id', 'nome');
    }
}
