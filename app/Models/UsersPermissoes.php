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

    public function getAll()
    {
        $items =  $this->newQuery()
            ->orderBy('nome')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                    'admin' => $item->is_admin,
                ];
            });

        $res = [];
        foreach ($items as $item) {
            $res[$item['admin'] ? 'admin' : 'geral'][] = $item;
        }

        return $res;
    }

    public function get($id)
    {
        //     return [];
        //     // $this->newQuery()
        //     //     ->where('user_id', $id)
        //     //     ->pluck('valor', 'chave');
    }
}
