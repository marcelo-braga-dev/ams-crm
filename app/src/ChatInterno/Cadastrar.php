<?php

namespace App\src\ChatInterno;

use App\Models\ChatInterno;
use App\Services\Images;
use App\src\ChatInterno\Categorias\Avisos;
use App\src\ChatInterno\Categorias\Chat;

class Cadastrar
{
    public function mensagem($dados)
    {
        $categoria = $dados->categoria == 'chat' ?
            (new Chat())->categoria() :
            (new Avisos())->categoria();

        $tipo = $dados->mensagem ? 'msg' : 'file';

        $msg = $dados->mensagem ?? (new Images())
            ->armazenar($dados, 'anexo', 'chat-interno');

        (new ChatInterno())
            ->create($dados->destinatario ?? id_usuario_atual(), $msg, $tipo, $categoria);
    }
}