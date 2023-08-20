<?php

namespace App\Services\ChatInterno;

use App\Models\ChatInterno;
use App\Models\User;

class MensagensChatInternoService
{
    public function conversas()
    {
        $online = $this->online();
        $mensagens = (new ChatInterno())->getDestinatarios();
        $nomes = (new User())->getNomes();
        $fotos = (new User())->getFotos();
        $usuarioAtual = id_usuario_atual();

        $users = [];
        $qtnNova = [];
        foreach ($mensagens as $mensagem) {
            $id = $mensagem->destinatario === $usuarioAtual ? $mensagem->users_id : $mensagem->destinatario;

            if ($mensagem->destinatario === $usuarioAtual &&
                $mensagem->status === 'novo') $qtnNova[$id][] = 'x';

            $users[$id] = [
                'ordem' => strtotime($mensagem->created_at),
                'id' => $id,
                'nome' => $nomes[$id],
                'ultima_mensagem' => $mensagem->mensagem,
                'data_mensagem' => date('d/m/y H:i:s', strtotime($mensagem->created_at)),
                'tipo' => $mensagem->tipo,
                'status' => $mensagem->status,
                'foto' => $fotos[$id],
                'online' => $online[$id] ?? false,
            ];
        }

        $dados = [];
        foreach ($users as $item) {
            $dados[] = array_merge($item, ['qtd_nova' => empty($qtnNova[$item['id']]) ? 0 : count($qtnNova[$item['id']])]);
        }

        arsort($dados);
        $res = [];
        foreach ($dados as $item) {
            $res[] = $item;
        }

        return $res;
    }

    public function chatAlertas()
    {
        return (new ChatInterno())->chatAlerta();
    }

    public function mensagens($usuario, $destinatario, $categoria = 'chat')
    {
        $mensagens = [];
        if ($categoria === 'chat') $mensagens = (new ChatInterno())->getMensagens($usuario, $destinatario);
        if ($categoria === 'avisos') $mensagens = (new ChatInterno())->getAvisos();

        $usuarios = (new User())->getNomes();
        $fotos = (new User())->getFotos();

        $dados = [];
        $periodo = '';
        foreach ($mensagens as $mensagem) {
            $periodoAtual = date('d/m/Y', strtotime($mensagem->created_at));;
            if ($periodo != $periodoAtual) $periodoMostrar = $periodoAtual; else $periodoMostrar = 0;
            $dados[] = [
                'id_mensagem' => $mensagem->id,
                'id_destinatario' => $mensagem->destinatario,
                'nome_destinatario' => $usuarios[$mensagem->destinatario],
                'id_usuario' => $mensagem->users_id,
                'nome_usuario' => $usuarios[$mensagem->users_id],
                'status' => $mensagem->status,
                'mensagem' => $mensagem->mensagem,
                'is_resposta' => id_usuario_atual() == $mensagem->destinatario ? 1 : 0,
                'data' => date('d/m/y H:i:s', strtotime($mensagem->created_at)),
                'tipo' => $mensagem->tipo,
                'foto' => $fotos[$mensagem->users_id],
                'categoria' => $categoria,
                'periodo_data' => date('d/m/Y') == $periodoMostrar ? 'Hoje' : $periodoMostrar
            ];

            $periodo = date('d/m/Y', strtotime($mensagem->created_at));
        }
        return $dados;
    }

    private function online(): array
    {
        $dados = (new User())->usuariosOnline();

        $item = [];
        foreach ($dados as $dado) {
            $item[$dado->id] = true;
        }
        return $item;
    }
}
