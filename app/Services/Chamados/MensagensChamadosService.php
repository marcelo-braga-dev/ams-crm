<?php

namespace App\Services\Chamados;

use App\Models\PedidosChamadosHistoricos;
use App\Models\User;
use App\src\Chamados\StatusChamados;

class MensagensChamadosService
{
    private array $usuarios;

    public function __construct()
    {
        $this->usuarios = (new User())->getNomes();
    }

    public function mensagens(int $id)
    {
        $dados = (new PedidosChamadosHistoricos())->getMensagens($id);

        return $dados->map(function ($dados) {
            return [
                'nome' => $this->usuarios[$dados->user_id],
                'status' => (new StatusChamados())->getNomeStatus($dados->status),
                'msg' => $dados->msg,
                'anexo_1' => $dados->anexo_1,
                'anexo_2' => $dados->anexo_2,
                'prazo' => $dados->prazo,
                'data' => date('d/m/y H:i', strtotime($dados->updated_at))
            ];
        });
    }
}
