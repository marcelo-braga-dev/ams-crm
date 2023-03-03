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
        'tipo'
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
            ->orWhere([
                ['users_id', $destinatarios], ['destinatario', $usuario]
            ])->get();
    }

    public function getDestinatarios()
    {
        $usuario = id_usuario_atual();

        return $this->newQuery()
            ->where('users_id', $usuario)
            ->orWhere('destinatario', $usuario)
            ->get();
    }

    public function countMensagenNovas(int $id)
    {
        return $this->newQuery()
            ->where('destinatario', $id)
            ->where('status', (new NovoStatusChatInterno())->getStatus())
            ->count();
    }
}
