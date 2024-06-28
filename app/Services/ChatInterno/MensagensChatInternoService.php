<?php

namespace App\Services\ChatInterno;

use App\Models\ChatInterno;
use App\Models\User;

class MensagensChatInternoService
{
    public function conversas()
    {
        $online = $this->online();
        $usuarioAtual = id_usuario_atual();
        $nomes = (new User())->getNomes();
        $fotos = (new User())->getFotos();
        $mensagens = (new ChatInterno())->getDestinatarios($usuarioAtual);

        $users = [];
        $qtnNova = [];

        foreach ($mensagens as $mensagem) {
            $id = $mensagem->contato_id === $usuarioAtual ? $mensagem->user_id : $mensagem->contato_id;

            if ($mensagem->contato_id === $usuarioAtual && $mensagem->status === 'novo') {
                $qtnNova[$id][] = 'x';
            }

            $users[$id] = [
                'ordem' => strtotime($mensagem->created_at),
                'id' => $id,
                'nome' => $nomes[$id],
                'ultima_mensagem' => $mensagem->mensagem,
                'file' => !!$mensagem->url,
                'data_mensagem' => date('d/m/y H:i:s', strtotime($mensagem->created_at)),
                'status' => $mensagem->status,
                'foto' => $fotos[$id],
                'online' => $online[$id] ?? false,
            ];
        }

        $dados = array_map(function ($item) use ($qtnNova) {
            return array_merge($item, ['qtd_nova' => empty($qtnNova[$item['id']]) ? 0 : count($qtnNova[$item['id']])]);
        }, $users);

        usort($dados, function ($a, $b) {
            return $b['ordem'] - $a['ordem'];
        });

        return $dados;
    }

    public function chatAlertas()
    {
        return (new ChatInterno())->chatAlerta();
    }

    public function mensagens($usuario, $destinatario, $categoria = 'chat', $limit)
    {
        $mensagens = [];
        if ($categoria === 'chat') $mensagens = (new ChatInterno())->getMensagens($usuario, $destinatario, $limit);
        if ($categoria === 'avisos') $mensagens = (new ChatInterno())->getAvisos();

        $usuarios = (new User())->getNomes();
        $fotos = (new User())->getFotos();

        $dados = [];
        $periodo = '';
        foreach ($mensagens as $mensagem) {
            $periodoAtual = date('d/m/Y', strtotime($mensagem->created_at));;
            if ($periodo != $periodoAtual) $periodoMostrar = $periodoAtual;
            else $periodoMostrar = false;
            $dados[] = [
                'id_mensagem' => $mensagem->id,
                'chat_destinatario' => $destinatario,
                'id_destinatario' => $mensagem->contato_id,
                'nome_destinatario' => $usuarios[$mensagem->contato_id] ?? '',
                'id_usuario' => $mensagem->user_id,
                'nome_usuario' => $usuarios[$mensagem->user_id],
                'status' => $mensagem->lido,
                'mensagem' => $mensagem->mensagem,
                'url' => $mensagem->url,
                'is_resposta' => id_usuario_atual() == $mensagem->contato_id ? 1 : 0,
                'data' => date('d/m/y H:i:s', strtotime($mensagem->created_at)),
                'foto' => $fotos[$mensagem->user_id] ?? '',
                'categoria' => $categoria,
                'periodo_data' => date('d/m/Y') == $periodoMostrar ? 'Hoje' : $periodoMostrar
            ];

            $periodo = date('d/m/Y', strtotime($mensagem->created_at));
        }
        return $dados;
    }

    private function online(): array
    {
        return [];
        //$dados = (new User())->usuariosOnline();

        $item = [];
//        foreach ($dados as $dado) {
//            $item[$dado->id] = true;
//        }
        return $item;
    }
}
