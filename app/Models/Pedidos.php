<?php

namespace App\Models;

use App\Services\Leads\LeadsDadosService;
use App\Services\Pedidos\DadosPedidoServices;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\SituacaoPedido;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\StatusPedidos;
use App\src\Usuarios\Admins;
use App\src\Usuarios\Supervisores;
use DateTime;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Pedidos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'setor_id',
        'franquia_id',
        'fornecedor_id',
        'lead_id',
        'superior_id',
        'status',
        'status_data',
        'prazo',
        'sac',
        'pin',
        'preco_venda',
        'preco_custo',
        'forma_pagamento',
        'info_pedido',
        'situacao',
        'obs',
        'modelo',
        'repasse',
        'imposto',
    ];

    function create($dados)
    {
        $idUser = null;
        $status = (new ConferenciaStatusPedido())->getStatus();
        $prazo = (new ConferenciaStatusPedido())->getPrazo();
        if (is_supervisor()) {
            $lead = (new Leads())->find($dados->id_lead);
            $idUser = $lead->user_id;
        };

        try {
            $pedido = $this->newQuery()
                ->create([
                    'user_id' => $idUser ?? id_usuario_atual(),
                    'franquia_id' => franquia_usuario_atual(),
                    'superior_id' => $idUser ?? id_usuario_atual(),
                    'lead_id' => $dados->id_lead,
                    'setor_id' => setor_usuario_atual(),
                    'status' => $status,
                    'status_data' => now(),
                    'prazo' => $prazo,
                    'preco_venda' => convert_money_float($dados->preco),
                    'forma_pagamento' => $dados->forma_pagamento,
                    'fornecedor_id' => $dados->fornecedor,
                    'info_pedido' => $dados->obs,
                    'modelo' => modelo_usuario(),
                    'repasse' => convert_money_float($dados->repasse)
                ]);
        } catch (QueryException $exception) {
            print_pre($exception->getMessage());
            throw new \DomainException('Falha no cadastro do pedido.');
        }

        (new PedidosHistoricos())->create($pedido->id, $status, $prazo, null);
        (new LeadsHistoricos())->createPedido($dados->id_lead, $pedido->id);

        return $pedido->id;
    }

    public function pedidos(?int $setor)
    {
        $query = $this->newQuery();

        if ($setor) $query->where('setor_id', $setor);
        if (is_supervisor()) $query->whereIn('user_id', (new User())->getIdsSubordinados());

        return $query->orderByDesc('id')->get();
    }

    public function pedidosUsuario()
    {
        return $this->newQuery()
            ->where('user_id', id_usuario_atual())
            ->orderByDesc('id')
            ->get();
    }

    public function getDadosPedido(int $id): array
    {
        $pedidoDados = $this->newQuery()->findOrFail($id);

        return $this->dados($pedidoDados);
    }

    function updateStatus(int $id, string $status, $prazo, ?string $alerta = null, $situacao = 0)
    {
        $situacao = $situacao == 0 ? (new SituacaoPedido())->getNovoTag() : $situacao;

        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status,
                'status_data' => now(),
                'prazo' => $prazo,
                'situacao' => $situacao,
                'obs' => $alerta
            ]);

        // Historico
        (new PedidosHistoricos())->create($id, $status, $prazo, $alerta);
    }

    public function updateDados(int $id, $dados, $prazo)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'prazo' => $prazo,
                'preco_venda' => convert_money_float($dados->preco),
                'forma_pagamento' => $dados->forma_pagamento,
                'fornecedor_id' => $dados->fornecedor,
                'info_pedido' => $dados->obs
            ]);
    }

    public function updateChamado(int $id, int $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update(['sac' => $valor]);
    }

    public function updateSituacao($id, $code)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'situacao' => $code
            ]);
    }

    public function insertPrecoCusto(int $id, float $precoCusto, $imposto)
    {
        try {
            $this->newQuery()
                ->find($id)
                ->update([
                    'preco_custo' => $precoCusto,
                    'imposto' => $imposto,
                ]);
        } catch (QueryException $exception) {
            throw new \DomainException('Valor inválido');
        }
    }

    public function updatePrazo(int $id, int $prazo)
    {
        $this->newQuery()
            ->find($id)
            ->update(['prazo' => $prazo]);
    }

    public function getIdConsultor($id)
    {
        return $this->newQuery()->find($id)->user_id;
    }

    public function remove($id)
    {
        DB::beginTransaction();
        try {
            $pedido = $this->newQuery()->find($id);
            $pedido->delete();

            $cliente = (new PedidosClientes())->find($pedido->id);

            (new PedidosClientes())->remover($cliente->id ?? null);
            (new Enderecos())->remover($cliente->endereco ?? null);
            (new PedidosChamados())->remover($pedido->id);
            (new PedidosChamadosHistoricos())->remover($pedido->id);
            (new PedidosHistoricos())->remover($pedido->id);
            (new PedidosImagens())->remover($pedido->id);
        } catch (QueryException) {
            DB::rollBack();
        }
        DB::commit();
    }

    public function find($id)
    {
        return $this->newQuery()->findOrFail($id);
    }

    public function restaurar($id)
    {
        $dados = (new PedidosHistoricos())->newQuery()
            ->where('pedido_id', $id)
            ->orderByDesc('id')
            ->get()[1];

        $this->updateStatus($id, $dados->status, $dados->prazo);
    }

    public function getPedidos($idUsuario, $setorAtual, $fornecedorAtual)
    {
        $query = $this->newQuery();

        if ($idUsuario) $query->where('user_id', $idUsuario);
        if (franquia_selecionada() && funcao_usuario_atual() === (new Admins)->getFuncao()) $query->where('franquia_id', franquia_selecionada());
        if ($setorAtual) $query->where('setor_id', $setorAtual);
        if ($fornecedorAtual) $query->where('fornecedor_id', $fornecedorAtual);
        if (is_supervisor()) $query->whereIn('user_id', (new User())->getIdsSubordinados(true));

        return $query->get();
    }

    public function get(?int $setor)
    {
        $query = $this->newQuery();

        if ($setor) $query->where('setor_id', $setor);
        if (is_supervisor()) $query->whereIn('user_id', (new User())->getIdsSubordinados(true));

        $nomes = (new User())->getNomes();
        $clientes = (new PedidosClientes())->getCardDados();
        $integradores = (new Leads())->getNomes();
        $status = (new StatusPedidos())->getStatus();
        $setorNomes = (new Setores())->getNomes();
        $leads = (new Leads())->getNomes();

        return $query->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $integradores, $status, $clientes, $setorNomes, $leads) {
                return [
                    'id' => $item->id,
                    'status' => $status[$item->status] ?? '-',
                    'cliente' => ($clientes[$item->id]['nome'] ?? null) ?? ($leads[$item->cliente_id] ?? null),
                    'consultor' => $nomes[$item->user_id] ?? '-',
                    'integrador' => $integradores[$item->lead_id] ?? '-',
                    'preco' => convert_float_money($item->preco_venda),
                    'setor' => $setorNomes[$item->setor_id] ?? '',
                    'data' => date('d/m/y H:i', strtotime($item->status_data)),
                ];
            });
    }

    public function dados($pedido): array
    {
        // Consulta unica
        $consultor = (new User)->get($pedido->user_id);
        $fornecedor = (new Fornecedores())->find($pedido->fornecedor_id);
        $integrador = $pedido->lead_id ? (new LeadsDadosService())->lead($pedido->lead_id) : '';
        $files = (new PedidosImagens())->getImagens($pedido->id);
        $setores = (new Setores())->getNomes();

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
                'setor' => $setores[$pedido->setor_id]['nome'] ?? '',
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
                'repasse_float' => $pedido->repasse,
                'repasse' => convert_float_money($pedido->repasse),
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
                'id' => $cliente->id,
                'nome' => $cliente->nome ?? $cliente->razao_social ?? '',
                'endereco_id' => $cliente->endereco ?? '',
                'endereco' => (($cliente->endereco ?? '') ? getEnderecoCompleto($cliente->endereco) : ''),
                'cidade' => $cliente->cidade ?? '',
                'estado' => $cliente->estado ?? '',
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
                'rg' => (new PedidosArquivos())->getRG($pedido->id)[0]['url'] ?? $files->url_rg ?? null,
                'cpf' => (new PedidosArquivos())->getCPF($pedido->id)[0]['url'] ?? $files->url_cpf ?? null,
                'cnh' => (new PedidosArquivos())->getCNH($pedido->id)[0]['url'] ?? $files->url_cnh ?? null,
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

    public function pedidosPeriodo($inicio, $fim, $setor)
    {
        $query = $this->newQuery();
        if ($inicio) $query->whereDate('created_at', '>=', $inicio);
        if ($fim) $query->whereDate('created_at', '<=', $fim);
        if ($setor) $query->where('setor_id', $setor);

        return $query->get()
            ->transform(function ($pedido) {
                if ($pedido->modelo === 1) {
                    $cliente = (new PedidosClientes())->find($pedido->id);
                }
                if ($pedido->modelo === 2) {
                    $cliente = (new Leads())->find($pedido->lead_id);
                }

                return [
                    'pedido' => [
                        'id' => $pedido->id,
                        'data_criacao' => date('d/m/y H:i:s', strtotime($pedido->created_at))
                    ],
                    'cliente' => [
                        'id' => $cliente->id ?? '-',
                        'nome' => $cliente->nome ?? $cliente->razao_social ?? '',
                        'telefone' => converterTelefone($cliente->telefone ?? '') ?? '',
                        'cidade' => $cliente->cidade ?? '',
                        'estado' => $cliente->estado ?? '',
                    ],
                ];
            });
    }

    public function vendasMensaisUsuario($id, $ano)
    {
        return [
            'jan' => $this->getVendasMesUsuario($id, 1, $ano),
            'fev' => $this->getVendasMesUsuario($id, 2, $ano),
            'mar' => $this->getVendasMesUsuario($id, 3, $ano),
            'abr' => $this->getVendasMesUsuario($id, 4, $ano),
            'mai' => $this->getVendasMesUsuario($id, 5, $ano),
            'jun' => $this->getVendasMesUsuario($id, 6, $ano),
            'jul' => $this->getVendasMesUsuario($id, 7, $ano),
            'ago' => $this->getVendasMesUsuario($id, 8, $ano),
            'set' => $this->getVendasMesUsuario($id, 9, $ano),
            'out' => $this->getVendasMesUsuario($id, 10, $ano),
            'nov' => $this->getVendasMesUsuario($id, 11, $ano),
            'dez' => $this->getVendasMesUsuario($id, 12, $ano),
        ];
    }

    public function vendasMensaisSubordinados($id, $ano)
    {
        $items = (new User())->getIdsSubordinados(false, $id);
        $nomes = (new User())->getNomes();
        $metas = (new MetasVendas)->getMetasUsuarios($ano);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item]['nome'] = $nomes[$item] ?? '';
            $dados[$item]['metas'] = $metas[$item] ?? '';
            $dados[$item]['vendas'] = $this->vendasMensaisUsuario($item, $ano);
        }
        return [...$dados];
    }

    private function getVendasMesUsuario($id, $mes, $ano)
    {
        $pedidos = (new Pedidos())->newQuery()
            ->where('user_id', $id)
            ->whereIn('status', (new StatusPedidosServices())->statusFaturados())
            ->get('id')
            ->transform(function ($item) {
                return $item->id;
            });

        $queryPedidosHistoricos = (new PedidosHistoricos())->newQuery()
            ->whereIn('pedido_id', $pedidos)
            ->where('status', 'aguardando_faturamento');

        if ($mes) $queryPedidosHistoricos->whereMonth('created_at', $mes);
        if ($ano) $queryPedidosHistoricos->whereYear('created_at', $ano);

        $historicoFaturados = $queryPedidosHistoricos->get()
            ->transform(function ($item) {
                return [
                    'pedido_id' => $item->pedido_id,
                    'data' => date('d/m/Y H:i', strtotime($item->created_at)),
                ];
            });

        $idPedidosFaturados = [];
        $dadosPedido = [];
        foreach ($historicoFaturados as $item) {
            $idPedidosFaturados[] = $item['pedido_id'];
            $dadosPedido[$item['pedido_id']] = $item;
        }

        return (new Pedidos())->newQuery()
            ->whereIn('id', $idPedidosFaturados)
            ->sum('preco_venda');
    }
}
