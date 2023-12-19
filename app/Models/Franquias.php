<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Franquias extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome'
    ];

    public function get()
    {
        return $this->newQuery()
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                ];
            });
    }

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'nome' => $dados->nome
            ]);
    }
}
