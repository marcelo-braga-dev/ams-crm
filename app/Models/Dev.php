<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dev extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'status',
        'titulo',
        'descricao',
        'anotacoes',
        'data_prazo',
    ];

    public function create($request)
    {
        $this->newQuery()
            ->create([
                'titulo' => $request->titulo,
                'descricao' => $request->descricao,
                'data_prazo' => $request->prazo,
                'status' => 'novo'
            ]);
    }

    public function get()
    {
        return $this->newQuery()
            ->get();
    }
}
