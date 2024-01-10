<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'categoria',
        'status',
        'msg',
        'data'
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'user_id' => $dados->usuario,
                'categoria' => 'geral',
                'status' => 'novo',
                'msg' => $dados->msg,
                'data' => $dados->data
            ]);
    }
}
