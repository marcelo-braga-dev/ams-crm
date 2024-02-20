<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersOnlineHistorico extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'data',
        'anotacoes',
    ];

    public function create()
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'data' => now(),
            ]);
    }

    public function usuariosOnline()
    {
        $intervalo = date('Y-m-d H:i:s', (strtotime(now()) - 30));

        $items = (new User())->usuarios(true);

        $usuarios = [];
        foreach ($items as $item) {
            $usuarios[$item['id']] = $item;
        }

        return $this->newQuery()
            ->where('data', '>=', $intervalo)
            ->groupBy('user_id')
            ->orderBy('id')
            ->get()
            ->transform(function ($item) use ($usuarios) {
                return array_merge($usuarios[$item->user_id], ['ultimo_login' => date('d/m/y H:i', strtotime($item->data))]);
            });
    }
}
