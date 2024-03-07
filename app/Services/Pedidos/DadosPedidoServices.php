<?php

namespace App\Services\Pedidos;

use App\Models\Fornecedores;
use App\Models\Leads;
use App\Models\PedidosArquivos;
use App\Models\PedidosClientes;
use App\Models\PedidosImagens;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\LeadsDadosService;
use App\src\Pedidos\StatusPedidos;
use DateTime;

class DadosPedidoServices
{
    private $consultores;
    private array $pedidoCliente;
    private $fornecedores;
    private array $setores;
    private array $leads;

    public function __construct()
    {
        $this->consultores = (new User())->getNomes();
        $this->pedidoCliente = (new PedidosClientes())->getCardDados();
        $this->fornecedores = (new Fornecedores())->getNomes();
        $this->setores = (new Setores())->getNomes();
        $this->leads = (new Leads())->getNomes();
    }

    public function dadosCard($pedido, $faturamento = null)
    {
        if ($pedido->modelo === 1) $nomeCliente = $this->pedidoCliente[$pedido->id]['nome'] ?? '';
        if ($pedido->modelo === 2) $nomeCliente = $this->leads[$pedido->lead_id] ?? '';

        if ($this->status($pedido->status) || $this->prazo($pedido))
            return [
                'id' => $pedido->id,
                'modelo' => $pedido->modelo,
                'cliente' => $nomeCliente ?? '',
                'consultor' => $this->consultores[$pedido->user_id] ?? '',
                'preco' => convert_float_money($pedido->preco_venda),
                'fornecedor' => $this->fornecedores[$pedido->fornecedor_id] ?? '',
                'integrador' => $pedido->modelo == 1 ? ($this->leads[$pedido->lead_id] ?? '') : '',
                'setor' => $this->setores[$pedido->setor_id] ?? '',
                'status' => $pedido->status,
                'forma_pagamento' => $pedido->forma_pagamento,
                'faturamento' => $faturamento,
                'contato' => [
//                'telefone' => $pedido->cliente ? $this->clientes[$pedido->cliente]['telefone'] : $this->clientesPedidos[$pedido->id]['telefone'],
//                'email' => $pedido->cliente ? $this->clientes[$pedido->cliente]['email'] : $this->clientesPedidos[$pedido->id]['email']
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
        $consultor = (new User)->get($pedido->user_id);
        $fornecedor = (new Fornecedores())->find($pedido->fornecedor);
        $integrador = $pedido->lead_id ? (new LeadsDadosService())->lead($pedido->lead_id) : '';
        $files = (new PedidosImagens())->getImagens($pedido->id);

        if ($pedido->modelo === 1) {
            $cliente = (new PedidosClientes())->find($pedido->id);
        }
        if ($pedido->modelo === 2) {
            $cliente = (new Leads())->find($pedido->lead_id);
        }

        $isAdmin = is_admin();
        $precoCusto = $isAdmin
            ? ($pedido->preco_custo ? convert_float_money($pedido->preco_custo) : null)
            : null;

        return [
            'id' => $pedido->id,
            'pedido' => [
                'id' => $pedido->id,
                'status' => (new StatusPedidos())->getNomeStatus($pedido->status),
                'status_data' => date('d/m/y H:i:s', strtotime($pedido->status_data)),
                'alerta' => $pedido->obs,
                'setor' => $this->setores[$pedido->setor] ?? '',
                'situacao' => $pedido->situacao,
                'info' => $pedido->info_pedido,
                'forma_pagamento' => $pedido->forma_pagamento, //remover
                'sac' => $pedido->sac,
                'data_criacao' => date('d/m/y H:i:s', strtotime($pedido->created_at)),
            ],
            'consultor' => [
                'id' => $consultor['id'],
                'nome' => $consultor['nome'],
            ],
            'financeiro' => [
                'preco_float' => $pedido->preco_venda,
                'preco' => convert_float_money($pedido->preco_venda),
                'preco_custo' => $precoCusto,
                'forma_pagamento' => $pedido->forma_pagamento,
                'boletos' => (new PedidosArquivos())->getBoletos($pedido->id),
                'cheques' => (new PedidosArquivos())->getCheques($pedido->id),
                'pix' => (new PedidosArquivos())->getPix($pedido->id),
                'link_pagamento' => $files->url_pagamento ?? null,
            ],
            'prazos' => [
                'prazo' => date('d/m/y H:i', strtotime("+$pedido->prazo days", strtotime($pedido->status_data))),
                'prazo_atrasado' => $this->getDiferenca($pedido->status_data, $pedido->prazo),
                'prazoDias' => $pedido->prazo,
            ],
            'preco' => [
                'preco_float' => $pedido->preco_venda,// remover
                'convertido' => convert_float_money($pedido->preco_venda),// remover
                'preco_custo_convertido' => $precoCusto,// remover
            ],
            'fornecedor' => [
                'nome' => $fornecedor['nome'] ?? ''
            ],
            'integrador' => [
                'nome' => $integrador['cliente']['nome'] ?? '',
                'cnpj' => $integrador['cliente']['cnpj'] ?? ''
            ],
            'cliente' => [
                'nome' => $cliente->nome ?? $cliente->razao_social ?? '',
                'endereco_id' => $cliente->endereco ?? '',
                'endereco' => (($cliente->endereco ?? '') ? getEnderecoCompleto($cliente->endereco) : ''),
                'nascimento' => ($cliente->data_nascimento ?? '') ? date('d/m/Y', strtotime($cliente->data_nascimento)) : null,
                'email' => $cliente->email ?? '',
                'telefone' => converterTelefone($cliente->telefone ?? '') ?? '',
                'rg' => $cliente->rg ?? '',
                'cpf' => $cliente->cpf ?? '',
                'cnpj' => converterCNPJ($cliente->cnpj ?? '') ?? '',
                'inscricao_estadual' => $cliente->inscricao_estadual ?? '',
            ],
            'pedido_files' => [
                'orcamento' => $files->url_orcamento ?? null,
                'boleto' => $files->url_boleto ?? null,
                'boleto_2' => $files->url_boleto_2 ?? null,
                'recibo_1' => $files->url_recibo_1 ?? null,
                'recibo_2' => $files->url_recibo_2 ?? null,
                'nota_fiscal' => $files->url_nota_fiscal ?? null,
                'carta_autorizacao' => $files->url_carta_autorizacao ?? null,
                'planilha_pedido' => $files->url_planilha_pedido ?? null,
            ],
            'cliente_files' => [
                'rg' => $files->url_rg ?? (new PedidosArquivos())->getRG($pedido->id)[0]['url'] ?? null,
                'cpf' => $files->url_cpf ?? (new PedidosArquivos())->getCPF($pedido->id)[0]['url'] ?? null,
                'cnh' => $files->url_cnh ?? (new PedidosArquivos())->getCNH($pedido->id)[0]['url'] ?? null,
                'cnpj' => $files->url_cnpj ?? null,
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
