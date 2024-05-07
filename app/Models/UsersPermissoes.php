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
    ];

    public function atualizar($id, $permissoes)
    {
        $this->newQuery()
            ->where('user_id', $id)
            ->delete();

        foreach ($permissoes as $idPermissao => $item) {
            if ($item) $this->newQuery()
                ->create([
                    'user_id' => $id,
                    'chave' => $idPermissao,
                ]);
        }
    }

    public function permissoes($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->pluck('user_id', 'chave');
    }
}
