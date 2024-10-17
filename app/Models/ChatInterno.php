<?php

namespace App\Models;

use App\src\ChatInterno\Categorias\Avisos;
use App\src\ChatInterno\Categorias\Chat;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ChatInterno extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'contato_id',
        'lido',
        'mensagem',
        'url',
        'url_mime',
        'categoria',
        'token'
    ];

    public function create($destinatario, $msg, $dadosAnexo, $categoria, $token = null)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'contato_id' => $destinatario ?? id_usuario_atual(),
                'mensagem' => $msg,
                'url' => $dadosAnexo['url'],
                'url_mime' => $dadosAnexo['mime'],
                'categoria' => $categoria,
                'token' => $token
            ]);
    }

    public function getMensagens($usuario = null, $destinatarios, $limit = 20)
    {
        $categoria = (new Chat())->categoria();
        $usuario = $usuario ?? id_usuario_atual();

        $this->newQuery()
            ->where([
                ['user_id', $destinatarios], ['contato_id', $usuario], ['categoria', $categoria]
            ])->update([
                'lido' => 1
            ]);

        return $this->newQuery()
            ->where(function ($query) use ($usuario, $destinatarios, $categoria) {
                $query->where([
                    ['user_id', $usuario],
                    ['contato_id', $destinatarios]
                ])->orWhere([
                    ['user_id', $destinatarios],
                    ['contato_id', $usuario]
                ]);
            })
            ->where('categoria', $categoria)
            ->orderBy('id')
            ->limit(1000)
            ->get();
    }

    public function getDestinatarios($usuarioAtual)
    {
        $categoria = (new Chat())->categoria();

        return $this->newQuery()
            ->limit(5000)
            ->where(function ($query) use ($usuarioAtual, $categoria) {
                $query->where('user_id', $usuarioAtual)
                    ->where('categoria', $categoria);
            })
            ->orWhere(function ($query) use ($usuarioAtual, $categoria) {
                $query->where('contato_id', $usuarioAtual)
                    ->where('categoria', $categoria);
            })
            ->orderByDesc('id')
            ->get();
    }

    public function countMensagenNovas(int $id)
    {
        return $this->newQuery()
            ->where('contato_id', $id)
            ->where('lido', 0)
            ->count();
    }

    public function excluirConversa($idDestinatario)
    {
        $this->newQuery()
            ->where([
                ['user_id', id_usuario_atual()], ['contato_id', $idDestinatario]
            ])->orWhere([
                ['user_id', $idDestinatario], ['contato_id', id_usuario_atual()]
            ])->delete();
    }

    public function getAvisos()
    {
        $categoria = (new Avisos())->categoria();

        $this->newQuery()
            ->where('categoria', $categoria)
            ->where('contato_id', id_usuario_atual())
            ->update([
                'lido' => 1
            ]);

        return $this->newQuery()
            ->where('categoria', $categoria)
            ->where('contato_id', id_usuario_atual())
            ->get();
    }

    public function chatAlerta()
    {
        return $this->newQuery()
            ->where('categoria', (new Avisos())->categoria())
            ->where('contato_id', id_usuario_atual())
            ->where('lido', 0)
            ->count();
    }

    public function excluirAviso($id)
    {
        $msg = $this->newQuery()
            ->find($id);

        $this->newQuery()
            ->where('token', $msg->token)
            ->delete();
    }

    public function qtdNovas()
    {
        return $this->newQuery()
            ->where('contato_id', id_usuario_atual())
            ->where('lido', 0)
            ->count();
    }
}
