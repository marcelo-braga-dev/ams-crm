<?php

namespace App\Models;

use App\src\Usuarios\Admins;
use App\src\Usuarios\Supervisores;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'categoria',
        'notificar',
        'titulo',
        'msg',
        'url'
    ];

    public function create(int $user, string $categoria, string $titulo, ?string $msg, ?string $url)
    {
        $this->newQuery()
            ->create([
                'users_id' => $user,
                'categoria' => $categoria,
                'titulo' => $titulo,
                'msg' => $msg,
                'url' => $url,
            ]);
    }

    public function getUsuario(int $id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->orderByDesc('id')
            ->paginate(100);
    }

    public function countUsuario(int $id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->where('notificar', 1)
            ->count();
    }

    public function alterarAlerta(int $id, $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update(['notificar' => $valor]);
    }

    public function notificarConsultor(int $id, $categoria, string $titulo, $msg = null, $url = null)
    {
        $idConsultor = (new Pedidos())->getIdConsultor($id);

        $this->create($idConsultor, $categoria, $titulo, $msg, $url);
    }

    public function notificarAdmins(int $id, $categoria, string $titulo, $msg = null, $url = null)
    {
        $users = (new User())->getIdAdmins();

        foreach ($users as $user) {
            $this->create($user->id, $categoria, $titulo, $msg, $url);
        }
    }
}
