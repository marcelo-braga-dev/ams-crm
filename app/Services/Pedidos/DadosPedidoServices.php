<?php

namespace App\Services\Pedidos;

use App\Models\Fornecedores;
use App\Models\Integradores;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Models\User;
use App\src\Pedidos\StatusPedidos;
use DateTime;

class DadosPedidoServices
{
    public function dados($pedido): array
    {
        $cliente = (new PedidosClientes())->getCliente($pedido->id);
        $consultor = (new User)->get($pedido->users_id);
        $fornecedor = (new Fornecedores())->getFornecedor($pedido->fornecedor);
        $integrador = (new Integradores())->get($pedido->integrador);
        $files = (new PedidosImagens())->getImagens($pedido->id);

        return [
            'pedido' => [
                'id' => $pedido->id,
                'status' => (new StatusPedidos())->getNomeStatus($pedido->status),
                'status_data' => date('d/m/y H:i:s', strtotime($pedido->status_data)),
                'alerta' => $pedido->obs,
                'situacao' => $pedido->situacao,
                'info' => $pedido->info_pedido,
                'forma_pagamento' => $pedido->forma_pagamento,
                'sac' => $pedido->sac,
                'data_criacao' => date('d/m/y H:i:s', strtotime($pedido->created_at)),
            ],
            'consultor' => [
                'id' => $consultor['id'],
                'nome' => $consultor['nome'],
            ],
            'prazos' => [
                'prazo' => date('d/m/y H:i', strtotime("+$pedido->prazo days", strtotime($pedido->status_data))),
                'prazo_atrasado' => $this->getDiferenca($pedido->status_data, $pedido->prazo),
                'prazoDias' => $pedido->prazo,
            ],
            'preco' => [
                'preco_float' => $pedido->preco_venda,
                'convertido' => convert_float_money($pedido->preco_venda),
            ],
            'fornecedor' => [
                'nome' => $fornecedor['nome']
            ],
            'integrador' => [
                'nome' => $integrador['nome'],
                'cnpj' => $integrador['cnpj']
            ],
            'cliente' => [
                'nome' => $cliente->nome ?? $cliente->razao_social,
                'endereco_id' => $cliente->endereco,
                'endereco' => getEnderecoCompleto($cliente->endereco),
                'nascimento' => date('d/m/Y', strtotime($cliente->data_nascimento)),
                'email' => $cliente->email,
                'telefone' => $cliente->telefone,
                'rg' => $cliente->rg,
                'cpf' => $cliente->cpf,
                'cnpj' => $cliente->cnpj,
                'inscricao_estadual' => $cliente->inscricao_estadual,
            ],
            'pedido_files' => [
                'orcamento' => $files->url_orcamento,
                'boleto' => $files->url_boleto,
                'recibo_1' => $files->url_recibo_1,
                'recibo_2' => $files->url_recibo_2,
                'nota_fiscal' => $files->url_nota_fiscal,
                'carta_autorizacao' => $files->url_carta_autorizacao,
            ],
            'cliente_files' => [
                'rg' => $files->url_rg,
                'cpf' => $files->url_cpf,
                'cnh' => $files->url_cnh,
                'cnpj' => $files->url_cnpj,
                'comprovante_residencia' => $files->url_comprovante_residencia,
            ]
        ];
    }

    private function getDiferenca(mixed $prazoData, int $prazoLimite): ?int
    {
        $entrada = new DateTime(now());
        $saida = new DateTime(date('Y-m-d H:i:s', strtotime("+$prazoLimite days", strtotime($prazoData))));

        return $saida->diff($entrada)->invert ? null : 1;
    }
}
