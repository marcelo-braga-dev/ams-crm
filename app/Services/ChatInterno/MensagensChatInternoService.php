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

        $users = [];$n = [];
        foreach ($mensagens as $mensagem) {
            $id = $mensagem->destinatario === $usuarioAtual ? $mensagem->users_id : $mensagem->destinatario;

            if($mensagem->destinatario === $usuarioAtual &&
                $mensagem->status === 'novo') $n[$id][] = 'x';

            $users[$id] = [
                'id' => $id,
                'nome' => $nomes[$id],
                'qtd_nova' => '$ovan'
            ];
        }

        $dados = [];
        foreach ($users as $item) {
            $dados[] = array_merge($item, ['qtd_nova' => empty($n[$item['id']]) ? 0 : count($n[$item['id']])]);
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
                'id_destinatario' => $mensagem->destinatario,
                'nome_destinatario' => $usuarios[$mensagem->destinatario],
                'id_usuario' => $mensagem->users_id,
                'nome_usuario' => $usuarios[$mensagem->users_id],
                'status' => $mensagem->status,
                'mensagem' => $mensagem->mensagem,
                'is_resposta' => id_usuario_atual() == $mensagem->destinatario ? 1 : 0,
                'data' => date('d/m/y H:i:s', strtotime($mensagem->created_at)),
                'tipo' => $mensagem->tipo,
            ];
        }
        return $dados;
    }
}
