<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersPermissoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'chave',
        'valor',
    ];

    public function create($id, $chave, $valor)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['user_id' => $id,  'chave' => $chave],
                ['valor' => $valor]
            );
    }

    public function get($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->pluck('valor', 'chave');
    }
}
