<?php

namespace App\Models;

use App\Services\ChatInterno\NotificacoesChatInterno;
use App\src\Pedidos\Notificacoes\NotificacoesCategorias;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notificacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
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
                'user_id' => $user,
                'categoria' => $categoria,
                'titulo' => $titulo,
                'msg' => $msg,
                'url' => $url,
            ]);
    }

    public function getUsuario(string $categoria, $qtd = null)
    {
        return $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('categoria', $categoria)
            ->orderByDesc('id')
            ->limit($qtd)
            ->get()
            ->transform(function ($dado) {
                return [
                    'id' => $dado->id,
                    'titulo' => $dado->titulo,
                    'msg' => $dado->msg,
                    'categoria' => $dado->categoria,
                    'url' => $dado->url,
                    'notificar' => $dado->notificar,
                    'data' => date('d/m/y H:i:s', strtotime($dado->created_at)),
                ];
            });
    }

    public function getHistorico($id = null, $limit = null)
    {
        $nomes = (new User())->getNomes();

        $query = $this->newQuery()
            ->where('categoria', 'leads')
            ->limit($limit)
            ->orderByDesc('id');

        $query->whereIn('user_id', supervisionados(id_usuario_atual()));
        if ($id) $query->where('user_id', $id);

        return $query->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'nome' => $nomes[$item->user_id],
                    'msg' => $item->msg,
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });
    }

    public function countNotificacoes(): array
    {
        $idUsuario = id_usuario_atual();

        $qtdPedidos = $this->newQuery()
            ->where('user_id', $idUsuario)
            ->where('categoria', (new NotificacoesCategorias())->pedidos())
            ->where('notificar', 1)
            ->count();

        $qtdLeads = $this->newQuery()
            ->where('user_id', $idUsuario)
            ->where('categoria', (new NotificacoesCategorias())->leads())
            ->where('notificar', 1)
            ->count();

        $qtdSac = $this->newQuery()
            ->where('user_id', $idUsuario)
            ->where('categoria', (new NotificacoesCategorias())->sac())
            ->where('notificar', 1)
            ->count();

        $qtsChatInterno = (new NotificacoesChatInterno())->qtdNovas();

        return [
            'pedidos' => $qtdPedidos,
            'leads' => $qtdLeads,
            'chat_interno' => $qtsChatInterno,
            'sac' => $qtdSac
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

    public function marcarTodasLidas($categoria)
    {
        $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('categoria', $categoria)
            ->update([
                'notificar' => 0
            ]);
    }

    public function deletar($categoria)
    {
        $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->where('categoria', $categoria)
            ->delete();
    }

    public function countLeads(int $id)
    {
        return 28;
    }
}
