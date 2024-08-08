<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FerramentasTarefasUsuarios extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tarefa_id'
    ];

    public function create($id, $usuarios)
    {
        foreach ($usuarios ?? [] as $usuario) {
            $this->newQuery()
                ->create([
                    'user_id' => $usuario,
                    'tarefa_id' => $id,
                ]);
        }
    }

    public function tarefa($id)
    {
        $usuarios = (new User())->getNomesAvatar();

        return $this->newQuery()
            ->where('tarefa_id', $id)
            ->orderBy('id')
            ->get()
            ->transform(function ($item) use ($usuarios) {
                return [
                    'user_id' => $item->user_id,
                    'nome' => $usuarios[$item->user_id]['nome'] ?? '',
                    'foto' => $usuarios[$item->user_id]['foto'] ?? '',
                ];
            });
    }
}
