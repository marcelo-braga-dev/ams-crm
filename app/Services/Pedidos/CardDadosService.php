<?php

namespace App\Services\Pedidos;

use App\Models\Fornecedores;
use App\Models\Integradores;
use App\Models\Pedidos;
use App\Models\PedidosClientes;
use App\Models\User;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\AguardandoNotaStatus;
use App\src\Pedidos\Status\AguardandoPagamentoStatus;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use App\src\Pedidos\Status\LancadoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use App\src\Usuarios\TiposUsuarios;
use DateTime;

class CardDadosService
{
    private $pedidos;
    private array $consultores;
    private array $clientes;
    private array $fornecedores;
    private array $integradores;
    private array $cards;
    private array $status;

    public function __construct()
    {
        $this->consultores = (new User())->getNomeConsultores();
        $this->clientes = (new PedidosClientes())->getCardDados();
        $this->fornecedores = (new Fornecedores())->getCardDados();
        $this->integradores = (new Integradores())->getCardDados();
        $this->status = $this->setStatus();
    }

    // Retorna todos os cards
    public function getCards(): array
    {
        $this->pedidos = (new Pedidos())->getDadosCards();
        $this->pedidos();

        return $this->cards;
    }

    // Retorna todos os cards
    public function getCardsConsultor(): array
    {
        $this->pedidos = (new Pedidos())->getDadosCardsConsultor();
        $this->pedidos();

        return $this->cards;
    }

    private function pedidos()
    {
        foreach ($this->pedidos as $item) {
            $this->verificacao($item);

        }
    }

    private function dados($pedido)
    {
        $this->cards[$this->status[$pedido->status]][] = [
            'id' => $pedido->id,
            'cliente' => $this->clientes[$pedido->id]['nome'],
            'consultor' => $this->consultores[$pedido->users_id],
            'preco' => convert_float_money($pedido->preco_venda),
            'fornecedor' => $this->fornecedores[$pedido->fornecedor],
            'integrador' => $this->integradores[$pedido->integrador],
            'status' => $pedido->status,
            'forma_pagamento' => $pedido->forma_pagamento,
            'contato' => [
                'telefone' => $this->clientes[$pedido->id]['telefone'],
                'email' => $this->clientes[$pedido->id]['email']
            ],
            'prazos' => [
                'data_status' => date('d/m/y H:i', strtotime($pedido->status_data)),
                'data_prazo' => date('d/m/y H:i', strtotime("+$pedido->prazo days", strtotime($pedido->status_data))),
                'prazo_atrasado' => $this->getDiferenca($pedido->status_data, $pedido->prazo)
            ],
            'icones' => [
                'pin' => '',
            ],
            'infos' => [
                'situacao' => $pedido->situacao,
                'alerta' => $pedido->alerta,
                'sac' => $pedido->sac,
            ],
        ];
    }

    private function getDiferenca(mixed $prazoData, int $prazoLimite): ?int
    {
        $entrada = new DateTime(now());
        $saida = new DateTime(date('Y-m-d H:i:s', strtotime("+$prazoLimite days", strtotime($prazoData))));

        return $saida->diff($entrada)->invert ? null : 1;
    }

    private function setStatus(): array
    {
        $reprovado = (new RevisarStatusPedido())->getStatus();
        $conferenciaStatus = (new ConferenciaStatusPedido())->getStatus();
        $lancadoStatus = (new LancadoStatus())->getStatus();
        $notaStatus = (new AguardandoNotaStatus())->getStatus();
        $pagamentoStatus = (new AguardandoPagamentoStatus())->getStatus();
        $faturamentoStatus = (new AguardandoFaturamentoStatus())->getStatus();
        $faturadoStatus = (new FaturadoStatus())->getStatus();
        $entregueStatus = (new EntregueStatus())->getStatus();
        $canceladoStatus = (new CanceladoStatus())->getStatus();

        $status = [
            $reprovado => 'reprovado',
            $conferenciaStatus => 'conferencia',
            $lancadoStatus => 'lancado',
            $notaStatus => 'nota',
            $pagamentoStatus => 'pagamento',
            $faturamentoStatus => 'faturamento',
            $faturadoStatus => 'faturado',
            $entregueStatus => 'entregue',
            $canceladoStatus => 'cancelado'
        ];

        foreach ($status as $item) {
            $this->cards[$item] = [];
        }

        return $status;
    }

    private function verificacao($pedido)
    {
        $atrasado = $this->getDiferenca($pedido->status_data, $pedido->prazo);

        if ($pedido->status !== 'cancelado' && $pedido->status !== 'entregue') {
            $this->dados($pedido);

        } elseif (!$atrasado) {
            $this->dados($pedido);
        }
    }
}
