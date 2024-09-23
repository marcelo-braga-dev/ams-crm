<?php

namespace App\src\ChatInterno;

use App\Events\ChatInternoNovaMensagemRecebida;
use App\Models\ChatInterno;
use App\Models\User;
use App\Services\UploadFiles;
use App\src\ChatInterno\Categorias\Avisos;
use App\src\ChatInterno\Categorias\Chat;

class CadastrarChatInterno
{
    public function salvar($dados)
    {
        event(new ChatInternoNovaMensagemRecebida($dados->destinatario, $dados->mensagem));

        $dadosAnexo = (new UploadFiles())->armazenarComMime($dados, 'anexo', 'chat-interno');

        if ($dados->categoria == (new Chat())->categoria()) {
            (new ChatInterno())->create($dados->destinatario, $dados->mensagem, $dadosAnexo, (new Chat())->categoria());
            return;
        }

        $contatos = (new User())->getIdUsuarios();
        $token = uniqid();
        foreach ($contatos as $idusuario) {
            (new ChatInterno())->create($idusuario->id, $dados->mensagem, $dadosAnexo, (new Avisos())->categoria(), $token);
        }
    }
}
