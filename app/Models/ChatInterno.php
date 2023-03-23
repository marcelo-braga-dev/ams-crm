<?php

namespace App\Models;

use App\Services\Images;
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
        'status_chat'
    ];

    public function create($dados)
    {
        function cadastrar($this_, $destinatario, $msg, $tipo)
        {
            $this_->newQuery()
                ->create([
                    'users_id' => id_usuario_atual(),
                    'destinatario' => $destinatario,
                    'mensagem' => $msg,
                    'status' => (new NovoStatusChatInterno())->getStatus(),
                    'tipo' => $tipo
                ]);
        }

        if ($dados->mensagem) cadastrar($this, $dados->destinatario, $dados->mensagem, 'msg');

        if ($dados->anexo) {
            $msg = (new Images())->armazenar($dados, 'anexo', 'chat-interno');
            cadastrar($this, $dados->destinatario, $msg, 'file');
        }
    }

    public function getMensagens($usuario = null, $destinatarios)
    {
        $usuario = $usuario ?? id_usuario_atual();

        $this->newQuery()
            ->where([
                ['users_id', $destinatarios], ['destinatario', $usuario]
            ])->update([
                'status' => 'lido'
            ]);

        return $this->newQuery()
            ->where([
                ['users_id', $usuario], ['destinatario', $destinatarios]
            ])
            ->where('status_chat', 1)
            ->orWhere([
                ['users_id', $destinatarios], ['destinatario', $usuario], ['status_chat', 1]
            ])->get();
    }

    public function getDestinatarios()
    {
        $usuario = id_usuario_atual();

        return $this->newQuery()
            ->where('users_id', $usuario)
            ->where('status_chat', 1)
            ->orWhere([['destinatario', $usuario], ['status_chat', 1]])
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
                ['users_id', id_usuario_atual()], ['destinatario', $idDestinatario]
            ])
            ->where('status_chat', 1)
            ->orWhere([
                ['users_id', $idDestinatario], ['destinatario', id_usuario_atual()], ['status_chat', 1]
            ])->update([
                'status_chat' => 0
            ]);
    }
}
