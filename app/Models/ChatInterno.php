<?php

namespace App\Models;

use App\src\ChatInterno\Categorias\Chat;
use App\src\ChatInterno\Status\NovoStatusChatInterno;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatInterno extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'destinatario',
        'status',
        'mensagem',
        'tipo',
        'status_chat',
        'categoria'
    ];

    public function create($destinatario, $msg, $tipo, $categoria)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'destinatario' => $destinatario,
                'mensagem' => $msg,
                'status' => (new NovoStatusChatInterno())->getStatus(),
                'tipo' => $tipo,
                'categoria' => $categoria
            ]);
    }

    public function getMensagens($usuario = null, $destinatarios)
    {
        $usuario = $usuario ?? id_usuario_atual();

        $this->newQuery()
            ->where([
                ['users_id', $destinatarios], ['destinatario', $usuario], ['categoria', (new Chat())->categoria()]
            ])->update([
                'status' => 'lido'
            ]);

        return $this->newQuery()
            ->where([
                ['users_id', $usuario], ['destinatario', $destinatarios]
            ])
            ->where('status_chat', 1)
            ->where('categoria', (new Chat())->categoria())
            ->orWhere([
                ['users_id', $destinatarios],
                ['destinatario', $usuario],
                ['status_chat', 1],
                ['categoria', (new Chat())->categoria()]
            ])->get();
    }

    public function getDestinatarios()
    {
        $usuario = id_usuario_atual();

        return $this->newQuery()
            ->where('users_id', $usuario)
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
            ->where('categoria', 'chat')
            ->count();
    }

    public function excluirConversa($idDestinatario)
    {
        $this->newQuery()
            ->where([
                ['users_id', id_usuario_atual()], ['destinatario', $idDestinatario]
            ])
            ->where('status_chat', 1)
            ->orWhere([
                ['users_id', $idDestinatario], ['destinatario', id_usuario_atual()], ['status_chat', 1]
            ])->update([
                'status_chat' => 0
            ]);
    }

    public function getAvisos($usuario)
    {
        return $this->newQuery()
            ->where('categoria', 'aviso')
//            ->where('destinatario', id_usuario_atual())
            ->get();
    }

    public function chatAlerta()
    {
        return $this->newQuery()
            ->where('categoria', 'aviso')
            ->where('destinatario', id_usuario_atual())
            ->where('status_chat', 1)
            ->count();
    }
}
