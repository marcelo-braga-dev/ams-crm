<?php

namespace App\Services\ChatInterno;

use App\Models\ChatInterno;
use App\Models\User;

class MensagensChatInternoService
{
    public function conversas()
    {
        $mensagens = (new ChatInterno())->getDestinatarios();
        $nomes = (new User())->getNomes();
        $usuarioAtual = id_usuario_atual();

        $users = [];
        foreach ($mensagens as $mensagem) {
            $id = $mensagem->destinatario === $usuarioAtual ? $mensagem->users_id : $mensagem->destinatario;

            $users[$id] = [
                'id' => $id,
                'nome' => $nomes[$id],
            ];
        }

        $dados = [];
        foreach ($users as $item) {
            $dados[] = $item;
        }

        return $dados;
    }

    public function mensagens($usuario, $destinatario)
    {
        $mensagens = (new ChatInterno())->getMensagens($usuario, $destinatario);
        $usuarios = (new User())->getNomes();

        $dados = [];
        foreach ($mensagens as $mensagem) {
            $dados[] = [
                'usuario' => $mensagem->users_id,
                'destinatario' => $mensagem->destinatario,
                'nome_destinatario' => $usuarios[$mensagem->destinatario],
                'nome_usuario' => $usuarios[$mensagem->users_id],
                'status' => $mensagem->status,
                'mensagem' => $mensagem->mensagem,
                'resposta' => id_usuario_atual() == $mensagem->destinatario ? 1 : 0,
                'data' => date('d/m/y H:i:s', strtotime($mensagem->created_at)),

            ];
        }
        return $dados;
    }
}
