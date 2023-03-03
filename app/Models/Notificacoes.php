<?php

namespace App\Models;

use App\Services\ChatInterno\NotificacoesChatInterno;
use App\src\Pedidos\NotificacoesCategorias;
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

    public function create(int $user, string $categoria, string $titulo, ?string $msg, ?string $url = null)
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

    public function getUsuario(string $categoria)
    {
        return $this->newQuery()
            ->where('users_id', id_usuario_atual())
            ->where('categoria', $categoria)
            ->orderByDesc('id')
            ->paginate(50);
    }

    public function countNotificacoes(): array
    {
        $idUsuario = id_usuario_atual();

        $qtdPedidos = $this->newQuery()
            ->where('users_id', $idUsuario)
            ->where('categoria', (new NotificacoesCategorias())->pedidos())
            ->where('notificar', 1)
            ->count();

        $qtdLeads = $this->newQuery()
            ->where('users_id', $idUsuario)
            ->where('categoria', (new NotificacoesCategorias())->leads())
            ->where('notificar', 1)
            ->count();

        $qtsChatInterno = (new NotificacoesChatInterno())->qtdNovas();

        return [
            'pedidos' => $qtdPedidos,
            'leads' => $qtdLeads,
            'chat_interno' => $qtsChatInterno
        ];
    }

    public function alterarAlerta(int $id, $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update(['notificar' => $valor]);
    }

    public function notificarPedidoConsultor(int $id, $categoria, string $titulo, $msg = null, $url = null)
    {
        $idConsultor = (new Pedidos())->getIdConsultor($id);

        $this->create($idConsultor, $categoria, $titulo, $msg, $url);
    }

    public function notificarPedidoAdmins(int $id, $categoria, string $titulo, $msg = null, $url = null)
    {
        $users = (new User())->getIdAdmins();

        foreach ($users as $user) {
            $this->create($user->id, $categoria, $titulo, $msg, $url);
        }
    }

    public function remover($id)
    {
        // Implementar Delete
    }

    public function marcarTodasLidas()
    {
        $this->newQuery()
            ->where('users_id', auth()->id())
            ->update([
                'notificar' => 0
            ]);
    }

    public function countLeads(int $id)
    {
        return 28;
    }
}
