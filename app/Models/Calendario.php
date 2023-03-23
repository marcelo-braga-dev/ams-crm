<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'categoria',
        'status',
        'msg',
        'data'
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'users_id' => $dados->usuario,
                'categoria' => 'geral',
                'status' => 'novo',
                'msg' => $dados->msg,
                'data' => $dados->data
            ]);
    }
}
