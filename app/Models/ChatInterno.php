<?php

namespace App\Models;

use App\src\ChatInterno\Categorias\Avisos;
use App\src\ChatInterno\Categorias\Chat;
use App\src\ChatInterno\Status\NovoStatusChatInterno;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatInterno extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'destinatario',
        'status',
        'mensagem',
        'tipo',
        'status_chat',
        'categoria',
        'token'
    ];

    public function create($destinatario, $msg, $tipo, $categoria, $token = null)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'destinatario' => $destinatario,
                'mensagem' => $msg,
                'status' => (new NovoStatusChatInterno())->getStatus(),
                'tipo' => $tipo,
                'categoria' => $categoria,
                'token' => $token
            ]);
    }

    public function getMensagens($usuario = null, $destinatarios)
    {
        $usuario = $usuario ?? id_usuario_atual();

        $this->newQuery()
            ->where([
                ['user_id', $destinatarios], ['destinatario', $usuario], ['categoria', (new Chat())->categoria()]
            ])->update([
                'status' => 'lido'
            ]);

        return $this->newQuery()
            ->where([
                ['user_id', $usuario], ['destinatario', $destinatarios]
            ])
            ->where('status_chat', 1)
            ->where('categoria', (new Chat())->categoria())
            ->orWhere([
                ['user_id', $destinatarios],
                ['destinatario', $usuario],
                ['status_chat', 1],
                ['categoria', (new Chat())->categoria()]
            ])->get();
    }

    public function getDestinatarios()
    {
        $usuario = id_usuario_atual();

        return $this->newQuery()
            ->where('user_id', $usuario)
            ->where('status_chat', 1)
            ->where('categoria', (new Chat())->categoria())
            ->orWhere([['destinatario', $usuario], ['status_chat', 1], ['categoria', (new Chat())->categoria()]])
            ->get();
    }

    public function countMensagenNovas(int $id)
    {
        return $this->newQuery()
            ->where('destinatario', $id)
            ->where('status', (new NovoStatusChatInterno())->getStatus())
            ->count();
    }

    public function excluirConversa($idDestinatario)
    {
        $this->newQuery()
            ->where([
                ['user_id', id_usuario_atual()], ['destinatario', $idDestinatario]
            ])
            ->where('status_chat', 1)
            ->orWhere([
                ['user_id', $idDestinatario], ['destinatario', id_usuario_atual()], ['status_chat', 1]
            ])->update([
                'status_chat' => 0
            ]);
    }

    public function getAvisos()
    {
        $categoria = (new Avisos())->categoria();

        $this->newQuery()
            ->where('categoria', $categoria)
            ->where('destinatario', id_usuario_atual())
            ->update([
                'status' => 'lido'
            ]);

        return $this->newQuery()
            ->where('categoria', $categoria)
            ->where('destinatario', id_usuario_atual())
            ->where('status_chat', 1)
            ->get();
    }

    public function chatAlerta()
    {
        return $this->newQuery()
            ->where('categoria', (new Avisos())->categoria())
            ->where('destinatario', id_usuario_atual())
            ->where('status_chat', 1)
            ->where('status', 'novo')
            ->count();
    }

    public function excluirAviso($id)
    {
        $msg = $this->newQuery()
            ->find($id);

        $this->newQuery()
            ->where('token', $msg->token)
            ->update([
                'status_chat' => 0
            ]);
    }
}
