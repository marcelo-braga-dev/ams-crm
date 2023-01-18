<?php

namespace App\Services\Chamados;

use App\Models\PedidosClientes;
use App\Models\User;

/**
 * @deprecated
 */
class ChamadosService
{
    public array $usuarios = [];
    public array $clientes = [];

    public function __construct()
    {
        $this->clientes = (new PedidosClientes())->dados();
        $this->usuarios = (new User())->getNomes();
    }

    public function chamado($dados): array
    {
        return [
            'id' => $dados->id,
            'cliente' => $this->clientes[$dados->pedidos_id]['nome'],
            'analizador' => $dados->analizador,
            'status' => $dados->status,
            'data' => date('d/m/Y H:i', strtotime($dados->status_data)),
            'titulo' => $dados->titulo,
            'msg' => $dados->msg,
            'prazo_dias' => $dados->prazo,
            'resposta' => $dados->resposta,
            'img_1' => $dados->url_img_1,
            'telefone' => $this->clientes[$dados->pedidos_id]['telefone'],
            'email' => $this->clientes[$dados->pedidos_id]['email'],
        ];
    }
}
