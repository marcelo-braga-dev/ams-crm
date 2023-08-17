<?php

namespace App\Services\Pedidos;

use App\Models\Clientes;
use App\Models\ClientesArquivos;
use App\Models\Fornecedores;
use App\Models\Integradores;
use App\Models\Leads;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\LeadsDadosService;
use App\src\Pedidos\Arquivos\ChavesArquivosPedidos;
use App\src\Pedidos\StatusPedidos;
use App\src\Usuarios\Admins;
use DateTime;

class DadosPedidoServices
{
    private array $consultores;
    private array $clientesPedidos;
    private array $clientes;
    private array $fornecedores;
    private array $integradores;
    private array $setores;

    public function __construct()
    {
        $this->consultores = (new User())->getNomeConsultores();
        $this->clientesPedidos = (new PedidosClientes())->getCardDados();
        $this->clientes = (new Clientes())->getCardDados();
        $this->fornecedores = (new Fornecedores())->getCardDados();
        $this->integradores = (new Leads())->getCardDados();
        $this->setores = (new Setores())->getNomes();
    }

    public function dadosCard($pedido, $faturamento = null)
    {
        if ($this->status($pedido->status) || $this->prazo($pedido))
        return [
            'id' => $pedido->id,
            'cliente' => ($pedido->cliente ? $this->clientes[$pedido->cliente]['nome'] : $this->clientesPedidos[$pedido->id]['nome']) ?? '',
            'consultor' => $this->consultores[$pedido->users_id],
            'preco' => convert_float_money($pedido->preco_venda),
            'fornecedor' => $this->fornecedores[$pedido->fornecedor],
            'integrador' => $this->integradores[$pedido->integrador] ?? '',
            'setor' => $this->setores[$pedido->setor] ?? '',
            'status' => $pedido->status,
            'forma_pagamento' => $pedido->forma_pagamento,
            'faturamento' => $faturamento,
            'contato' => [
                'telefone' => $pedido->cliente ? $this->clientes[$pedido->cliente]['telefone'] : $this->clientesPedidos[$pedido->id]['telefone'],
                'email' => $pedido->cliente ? $this->clientes[$pedido->cliente]['email'] : $this->clientesPedidos[$pedido->id]['email']
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

    public function dados($pedido): array
    {
        $cliente = $pedido->cliente ? (new Clientes())->find($pedido->cliente) : (new PedidosClientes())->getCliente($pedido->id);
        $consultor = (new User)->get($pedido->users_id);
        $fornecedor = (new Fornecedores())->getFornecedor($pedido->fornecedor);
        $integrador = $pedido->integrador ? (new LeadsDadosService())->lead($pedido->integrador):'';
        $files = (new PedidosImagens())->getImagens($pedido->id);
        $filesCliente = (new ClientesArquivos())->get($pedido->cliente);
        $chavesArquivos = (new ChavesArquivosPedidos());

        $precoCusto = funcao_usuario_atual() == (new Admins())->getTipo()
            ? convert_float_money($pedido->preco_custo)
            : null;

        return [
            'pedido' => [
                'id' => $pedido->id,
                'status' => (new StatusPedidos())->getNomeStatus($pedido->status),
                'status_data' => date('d/m/y H:i:s', strtotime($pedido->status_data)),
                'alerta' => $pedido->obs,
                'setor' => $this->setores[$pedido->setor] ?? '',
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
                'preco_custo_convertido' => $precoCusto,
            ],
            'fornecedor' => [
                'nome' => $fornecedor['nome']
            ],
            'integrador' => [
                'nome' => $integrador['cliente']['nome'] ?? '',
                'cnpj' => $integrador['cliente']['cnpj'] ?? ''
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
                'orcamento' => $files->url_orcamento ?? null,
                'boleto' => $files->url_boleto ?? null,
                'recibo_1' => $files->url_recibo_1 ?? null,
                'recibo_2' => $files->url_recibo_2 ?? null,
                'nota_fiscal' => $files->url_nota_fiscal ?? null,
                'carta_autorizacao' => $files->url_carta_autorizacao ?? null,
            ],
            'cliente_files' => [
                'rg' => $files->url_rg ?? $filesCliente[$chavesArquivos->rg()] ?? null,
                'cpf' => $files->url_cpf ?? $filesCliente[$chavesArquivos->cpf()] ?? null,
                'cnh' => $files->url_cnh ?? $filesCliente[$chavesArquivos->cnh()] ?? null,
                'cnpj' => $files->url_cnpj ?? $filesCliente[$chavesArquivos->cnpj()] ?? null,
                'comprovante_residencia' => $files->url_comprovante_residencia ?? null,
            ]
        ];
    }

    private function getDiferenca(mixed $prazoData, int $prazoLimite): ?int
    {
        $entrada = new DateTime(now());
        $saida = new DateTime(date('Y-m-d H:i:s', strtotime("+$prazoLimite days", strtotime($prazoData))));

        return $saida->diff($entrada)->invert ? null : 1;
    }

    private function status($status): bool
    {
        return $status !== 'cancelado' && $status !== 'entregue';
    }

    private function prazo($pedido): bool
    {
        return !$this->getDiferenca($pedido->status_data, $pedido->prazo);
    }
}
