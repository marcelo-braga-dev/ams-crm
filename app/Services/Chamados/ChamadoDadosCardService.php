<?php

namespace App\Services\Chamados;

use App\Models\PedidosChamados;
use App\Models\PedidosClientes;
use App\Models\User;
use App\src\Chamados\Status\FinalizadosChamadoStatus;
use App\src\Chamados\Status\NovoChamadoStatus;
use App\src\Chamados\Status\RespondidoChamadoStatus;
use DateTime;

/**
 * @deprecated
 */
class ChamadoDadosCardService
{
    //private $dados;
    private $cards;

    public function __construct()
    {
        //$this->dados = (new PedidosChamados())->dadosCardAdmin();
        $this->cards = [];
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

        $this->cards[$novoStatus] = [];
        $this->cards[$respondidoStatus] = [];
        $this->cards[$finalizadoStatus] = [];

        // Pedidos
        foreach ($dados as $dado) {

            $this->verificacao($dado);
        }
        return $this->cards;
    }
    public function dados(mixed $dado)
    {
        $this->cards[$dado->status][] = [
            'id' => $dado->id,
            'id_pedido' => $dado->pedidos_id,
            'consultor' => $this->usuarios[$dado->consultor],
            'admin' => $this->usuarios[$dado->admin],
            'cliente' => getNomeCliente($dado->pedidos_id),
            'status_data' => date('d/m/y H:i', strtotime($dado->status_data)),
            'titulo' => $dado->titulo,
            'prazo' => $dado->prazo
        ];
    }

    private function verificacao($pedido)
    {
        $atrasado = $this->getDiferenca($pedido->status_data, 3);

        if ($pedido->status !== 'finalizado') {
            $this->dados($pedido);

        } elseif (!$atrasado) {
            $this->dados($pedido);
        }
    }

    private function getDiferenca(mixed $prazoData, int $prazoLimite): ?int
    {
        $entrada = new DateTime(now());
        $saida = new DateTime(date('Y-m-d H:i:s', strtotime("+$prazoLimite days", strtotime($prazoData))));

        return $saida->diff($entrada)->invert ? null : 1;
    }

    public function cards()
    {
    }
}
