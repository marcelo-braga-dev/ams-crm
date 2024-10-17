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
        $nomeAvatar = (new User())->getNomesAvatar();
        $mensagens = (new ChatInterno())->getDestinatarios($usuarioAtual)->toArray();

        $users = [];

        $qtnNova2 = array_reduce($mensagens, function ($carry, $mensagem) use ($usuarioAtual) {
            $id = $mensagem['contato_id'] === $usuarioAtual ? $mensagem['user_id'] : $mensagem['contato_id'];
            if ($mensagem['lido'] == '0' && $mensagem['contato_id'] == $usuarioAtual) {
                $carry[$id][] = 1;
            }
            return $carry;
        }, []);

        foreach ($mensagens as $mensagem) {
            $id = $mensagem['contato_id'] === $usuarioAtual ? $mensagem['user_id'] : $mensagem['contato_id'];

            $users[$id] = [
                'ordem' => strtotime($mensagem['created_at']),
                'id' => $id,
                'nome' => $nomeAvatar[$id]['nome'] ?? 'Nome Indisponível',
                'ultima_mensagem' => '',
                'file' => !empty($mensagem['url']),
                'data_mensagem' => date('d/m/y H:i:s', strtotime($mensagem['created_at'])),
                'status' => $mensagem['status'] ?? '',
                'foto' => $nomeAvatar[$id]['foto'] ?? null,
                'online' => $online[$id] ?? false,
                'qtd_nova' => count($qtnNova2[$id] ?? []),
            ];
        }

        return array_values($users);
    }

    public function chatAlertas()
    {
        return (new ChatInterno())->chatAlerta();
    }

    public function mensagens($usuario, $destinatario, $categoria = 'chat', $limit)
    {
        if (!$destinatario) return [];
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
                'url' => url_arquivos($mensagem->url),
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
