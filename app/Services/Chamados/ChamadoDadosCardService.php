<?php

namespace App\Services\Chamados;

use App\Models\PedidosChamados;
use App\Models\PedidosClientes;
use App\Models\User;
use App\src\Chamados\Status\FinalizadosChamadoStatus;
use App\src\Chamados\Status\NovoChamadoStatus;
use App\src\Chamados\Status\RespondidoChamadoStatus;

class ChamadoDadosCardService
{
    //private $dados;

    public function __construct()
    {
        //$this->dados = (new PedidosChamados())->dadosCardAdmin();
        $this->usuarios = (new User())->getNomes();
        $this->clientes = (new PedidosClientes())->getNomes();
    }

    public function cardsAdmin()
    {
        return $this->dadosCard((new PedidosChamados())->dadosCardAdmin());
    }

    public function cardsConsultor()
    {
        return $this->dadosCard((new PedidosChamados())->dadosCardConsultor());
    }

    private function dadosCard($dados): array
    {
        $novoStatus = (new NovoChamadoStatus())->getStatus();
        $respondidoStatus = (new RespondidoChamadoStatus())->getStatus();
        $finalizadoStatus = (new FinalizadosChamadoStatus())->getStatus();

        $cards[$novoStatus] = [];
        $cards[$respondidoStatus] = [];
        $cards[$finalizadoStatus] = [];

        // Pedidos
        foreach ($dados as $dado) {
            $cards[$dado->status][] = [
                'id' => $dado->id,
                'consultor' => $this->usuarios[$dado->consultor],
                'admin' => $this->usuarios[$dado->admin],
                'cliente' => getNomeCliente($dado->pedidos_id),
                'status_data' => date('d/m/y H:i', strtotime($dado->status_data)),
                'titulo' => $dado->titulo,
                'prazo' => $dado->prazo
            ];
        }
        return $cards;
    }
}
