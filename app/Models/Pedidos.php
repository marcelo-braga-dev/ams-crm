<?php

namespace App\Models;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos\Instalacoes\PedidosInstalacoesAnotacoes;
use App\Models\Pedidos\PedidosFinanciamentoDados;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\SituacaoPedido;
use App\src\Pedidos\Status\ConferenciaStatusPedido;
use App\src\Pedidos\StatusPedidos;
use DateTime;
use Illuminate\Database\Eloquent\Builder;
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
        'preco_venda',
        'preco_custo',
        'forma_pagamento',
        'data_faturamento',
        'user_faturamento',
        'info_pedido',
        'situacao',
        'obs',
        'modelo',
        'repasse',
        'repasse_desconto',
        'imposto',
        'pagamento_vencimento_data',
        'pagamento_ignorar_vencimento',
        'created_at'
    ];

    public function cliente()
    {
        return $this->belongsTo(PedidosClientes::class, 'id', 'pedido_id');
    }

    public function pedidosInstalacoesAnotacoes()
    {
        $this->belongsTo(PedidosInstalacoesAnotacoes::class, 'pedido_id');
    }

    protected function getStatusAttribute()
    {
        if (empty($this->attributes['pagamento_vencimento_data'] ?? null)) return $this->attributes['status'];;

        $data = \Carbon\Carbon::parse($this->attributes['pagamento_vencimento_data']);
        $statusAtual = $this->attributes['status'];

        if ($data->isPast() && ($this->attributes['status'] == 'aguardando_pagamento' && !$this->attributes['pagamento_ignorar_vencimento'])) {
            $this->newQuery()->find($this->attributes['id'])->update(['status' => 'vencido']);
            $statusAtual = 'vencido';
        }

        return $statusAtual;
    }

    /**
     * Deplecated
     **/
    public function historicoPedidosLead($id)
    {
        $status = (new StatusPedidos());
        $nomes = (new User())->getNomes();

        return $this->newQuery()
            ->where('lead_id', $id)
            ->orderByDesc('id')
            ->get(['id', 'preco_venda', 'pedidos.created_at as data_criacao', 'status', 'user_id'])
            ->transform(function ($item) use ($status, $nomes) {
                return [
                    'id' => $item->id,
                    'status' => $status->getNomeStatus($item->status),
                    'valor' => convert_float_money($item->preco_venda),
                    'consultor' => $nomes[$item->user_id],
                    'data_criacao' => date('d/m/y H:i', strtotime($item->data_criacao)),
                ];
            });
    }

    public function getVendasMesUsuario($id, $mes, $ano)
    {
        return (new Pedidos())->newQuery()
            ->where('user_faturamento', $id)
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereMonth('data_faturamento', $mes)
            ->whereYear('data_faturamento', $ano)
            ->select(DB::raw('
                count(*) as qtd,
                SUM(preco_venda) as vendas,
                SUM(preco_custo) as custos
                '))
            ->first();
    }

    public function vendasPeriodo($mes, $ano, $setor, $indice = false)
    {
        $nomes = (new User())->getNomesAvatar();

        $items = $this->newQuery()
            ->join('users', 'users.id', '=', 'pedidos.user_faturamento')
            ->whereIn(DB::raw('MONTH(pedidos.data_faturamento)'), $mes)
            ->whereIn('pedidos.status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
            ->whereYear('pedidos.data_faturamento', $ano)
            ->where('pedidos.setor_id', $setor)
            ->select(DB::raw('
                user_faturamento as id,
                SUM(preco_venda) as vendas,
                SUM(preco_custo) as custos,
                (SUM(preco_venda) - SUM(preco_custo)) as lucro,
                COUNT(user_faturamento) as qtd,
                users.status as status
            '))
            ->groupBy('user_faturamento')
            ->orderByDesc('vendas')
            ->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'id' => $item->id,
                    'vendas' => $item->vendas,
                    'custos' => $item->custos,
                    'lucro' => $item->lucro,
                    'qtd' => $item->qtd,
                    'nome' => $nomes[$item->id]['nome'] ?? '',
                    'foto' => $nomes[$item->id]['foto'] ?? '',
                    'user_id' => $nomes[$item->id]['id'] ?? '',
                    'status' => !!$item->status
                ];
            });

        if (!$indice) return $items;

        $res = [];
        foreach ($items as $item) {
            $res[$item['id']] = $item;
        }
        return $res;
    }

    public function vendasMensalEmpresa($mes, $ano, $setor)
    {
        return $this->newQuery()
            ->whereIn(DB::raw('MONTH(data_faturamento)'), $mes)
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
            ->whereYear('data_faturamento', $ano)
            ->where('setor_id', $setor)
            ->select(DB::raw('
                SUM(preco_venda) as vendas,
                SUM(preco_custo) as custos,
                (SUM(preco_venda) - SUM(preco_custo)) as lucro,
                COUNT(user_faturamento) as qtd
            '))
            ->orderByDesc('vendas')
            ->first();
    }

    public function vendasAnualEmpresa($ano, $setor)
    {
        $dados = $this->newQuery()
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereIn('pedidos.user_faturamento', supervisionados(id_usuario_atual()))
            ->whereYear('data_faturamento', $ano)
            ->where('setor_id', $setor)
            ->select(DB::raw('
                SUM(preco_venda) as vendas,
                SUM(preco_custo) as custos,
                (SUM(preco_venda) - SUM(preco_custo)) as lucro,
                COUNT(user_faturamento) as qtd,
                MONTH(data_faturamento) as mes
            '))
            ->groupBy(DB::raw('MONTH(data_faturamento)'))
            ->orderBy(DB::raw('MONTH(data_faturamento)'))
            ->get();

        $res = [];
        foreach ($dados as $dado) {
            $res[$dado->mes] = $dado;
        }

        return $res;

    }

    public function estornarProdutos($id)
    {
        (new PedidosProdutos())->estornar($id);
    }

    private function calculoLucro($isFinanceiro, $pedido, $frete)
    {
        if (!$isFinanceiro) return null;
        $lucroBruto = ($pedido->preco_venda - $pedido->preco_custo) * (1 - ($pedido->imposto / 100)) - ($frete->valor_frete ?? 0);
        $lucroRepasse = $pedido->repasse * ($pedido->repasse_desconto / 100);
        return convert_float_money($lucroBruto + $lucroRepasse);
    }

    public function calculoRepasse($pedido): mixed
    {
        return convertFloatToMoney($pedido->repasse - ($pedido->repasse * 0.138));
    }

    function create($dados)
    {
        $idUser = null;
        $status = (new ConferenciaStatusPedido())->getStatus();
        $prazo = (new ConferenciaStatusPedido())->getPrazo();

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
                    'repasse' => convert_money_float($dados->repasse),
                    'repasse_desconto' => $dados->repasse ? 13.8 : null,
                    'created_at' => $dados->pedido_data ? (new DateTime($dados->pedido_data))->format('Y-m-d H:i:s') : now()
                ]);
        } catch (QueryException $exception) {
            throw new \DomainException('Falha no cadastro do pedido.');
        }

        if ($dados['tipo_financiamento'] ?? null) (new PedidosFinanciamentoDados())->create($pedido->id, $dados['tipo_financiamento']);

        (new LeadsANTIGO())->atualizarDataUltimoPedido($dados->id_lead);
        (new LeadsANTIGO())->atualizarStatusAtivo($dados->id_lead);
        (new PedidosHistoricos())->create($pedido->id, $status, $prazo, null);
        (new LeadsHistoricos())->createPedido($dados->id_lead, $pedido->id);

        return $pedido->id;
    }

    public function pedidos(?int $setor)
    {
        $query = $this->newQuery();

        if ($setor) $query->where('setor_id', $setor);
        $query->whereIn('user_id', supervisionados(id_usuario_atual()));

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

    public function insertPrecoCusto(int $id, float $precoCusto, $imposto = null)
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

    public function restaurar($id, $motivo)
    {
        $dados = (new PedidosHistoricos())->newQuery()
            ->where('pedido_id', $id)
            ->orderByDesc('id')
            ->get()[1];

        $this->updateStatus($id, $dados->status, $dados->prazo, $motivo);
    }

    public function getPedidos($idUsuario, $setor, $fornecedor, $leadCnpj)
    {
        $usuarioAtual = id_usuario_atual();

        $query = $this->newQuery()
            ->leftJoin('pins', 'pedidos.id', '=', DB::raw('pins.pedido_id AND pins.user_id = ' . $usuarioAtual))
            ->leftJoin('users', 'pedidos.user_id', '=', 'users.id')
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->leftJoin('pedidos_clientes', 'pedidos.id', '=', 'pedidos_clientes.pedido_id')
            ->leftJoin('produtos_fornecedores', 'pedidos.fornecedor_id', '=', 'produtos_fornecedores.id')
            ->leftJoin('setores', 'pedidos.setor_id', '=', 'setores.id')
            ->orderByDesc('pin')
            ->orderBy('status_data');

        if (!$leadCnpj) $query->whereIn('pedidos.user_id', supervisionados($usuarioAtual));

        $query->where(function ($query) use ($leadCnpj) {
            if (!$leadCnpj) {
                $query->where(function ($query) {
                    $query->where('pedidos.status', 'entregue')
                        ->whereRaw('DATEDIFF(CURDATE(), pedidos.status_data) <= 1')
                        ->orWhere('pedidos.status', '!=', 'entregue');
                });
            }

            $query->where(function ($query) {
                $query->where('pedidos.status', 'cancelado')
                    ->whereRaw('DATEDIFF(CURDATE(), pedidos.status_data) <= 1')
                    ->orWhere('pedidos.status', '!=', 'cancelado');
            });
        });

        if ($idUsuario) $query->where('pedidos.user_id', $idUsuario);
        if ($leadCnpj) $query->where('leads.cnpj', $leadCnpj);
        if ($setor) $query->where('pedidos.setor_id', $setor);
        if ($fornecedor) $query->where('pedidos.fornecedor_id', $fornecedor);

        $query->select(DB::raw("
            pedidos.*, CASE WHEN pins.user_id = " . $usuarioAtual . " THEN TRUE ELSE FALSE END as pin,
            users.name as consultor_nome, leads.nome as lead_nome,leads.razao_social as lead_razao_social, pedidos_clientes.nome as cliente_nome, pedidos_clientes.razao_social as cliente_razao_social,
            produtos_fornecedores.nome as fornecedor, setores.nome as setor_nome, setores.cor as setor_cor
        "));

        return $query->get()
            ->transform(function ($pedido) {
                return [
                    'id' => $pedido->id,
                    'pin' => !!$pedido->pin,
                    'modelo' => $pedido->modelo,
                    'cliente' => $pedido->cliente_nome ?? $pedido->cliente_razao_social ?? null,
                    'consultor' => $pedido->consultor_nome,
                    'preco' => $pedido->preco_venda,
                    'fornecedor' => $pedido->fornecedor ?? '',
                    'integrador' => $pedido->lead_nome ?: $pedido->lead_razao_social,
                    'setor_nome' => $pedido->setor_nome,
                    'setor_cor' => $pedido->setor_cor,
                    'status' => $pedido->status,
                    'forma_pagamento' => $pedido->forma_pagamento,
                    'contato' => [
//                'telefone' => $pedido->cliente ? $this->clientes[$pedido->cliente]['telefone'] : $this->clientesPedidos[$pedido->id]['telefone'],
//                'email' => $pedido->cliente ? $this->clientes[$pedido->cliente]['email'] : $this->clientesPedidos[$pedido->id]['email']
                    ],
                    'prazos' => [
                        'data_status' => date('d/m/y H:i', strtotime($pedido->status_data)),
                        'data_prazo' => date('d/m/y H:i', strtotime("+$pedido->prazo days", strtotime($pedido->status_data))),
                        'prazo_atrasado' => false//diferenca que falta para o prazo estourar
                    ],
                    'infos' => [
                        'situacao' => $pedido->situacao,
                        'alerta' => $pedido->alerta,
                        'sac' => $pedido->sac,
                    ],
                ];
            });
    }

    public function paginate($filtros, $leadCNPJ = null)
    {
        $query = $this->newQuery()
            ->leftJoin('leads', 'pedidos.lead_id', '=', 'leads.id')
            ->leftJoin('pedidos_clientes', 'pedidos.id', '=', 'pedidos_clientes.pedido_id')
            ->leftJoin('users', 'pedidos.user_id', '=', 'users.id')
            ->orderByDesc('pedidos.id')
            ->selectRaw('pedidos.*, leads.nome AS lead_nome, leads.id AS lead_id, pedidos_clientes.nome AS cliente_nome,
                users.name AS consultor_nome');

        if ($leadCNPJ) {
            $query->where('leads.cnpj', $leadCNPJ);
        } else {
            $query->whereIn('pedidos.user_id', supervisionados(id_usuario_atual()));
        }

        $this->filtrar($filtros, $query);

        $status = (new StatusPedidos())->getStatus();
        $setorNomes = (new Setores())->getNomes();

        $items = $query->paginate();

        $dados = $items->transform(function ($item) use ($status, $setorNomes) {
            $item->status = $status[$item->status] ?? '-';
            $item->preco = convert_float_money($item->preco_venda);
            $item->setor = $setorNomes[$item->setor_id] ?? '';
            $item->data = date('d/m/y H:i', strtotime($item->status_data));
            return $item;
        });

        return ['dados' => $dados, 'paginate' => ['current' => $items->currentPage(), 'last_page' => $items->lastPage(), 'total' => $items->total()]];
    }

    public function dados($pedido): array
    {
        // Consulta unica
        $consultor = (new User)->get($pedido->user_id);
        $fornecedor = (new Fornecedores())->find($pedido->fornecedor_id);
        $integrador = $pedido->lead_id ? (new LeadsANTIGO())->getDados($pedido->lead_id) : '';
        $files = (new PedidosImagens())->getImagens($pedido->id);
        $setores = (new Setores())->getNomes();
        $frete = (new PedidosFretes())->pedido($pedido->id);
        $faturado = (new PedidosFaturados())->pedido($pedido->id);

        $isFianciamento = $pedido->forma_pagamento === 'Financiamento';
        $dadosFinanciamento = $isFianciamento ? (new PedidosFinanciamentoDados())->getDados($pedido->id) : null;

        if ($pedido->modelo === 1) {
            $cliente = (new PedidosClientes())->find($pedido->id);
        }
        if ($pedido->modelo === 2) {
            $cliente = (new LeadsANTIGO())->find($pedido->lead_id);
        }

        $isFinanceiro = is_financeiro();
        $precoCusto = $isFinanceiro ? ($pedido->preco_custo ? convert_float_money($pedido->preco_custo) : null) : null;

        return [
            'id' => $pedido->id,
            'pedido' => [
                'id' => $pedido->id,
                'status' => (new StatusPedidos())->getNomeStatus($pedido->status),
                'status_data' => date('d/m/y H:i:s', strtotime($pedido->status_data)),
                'alerta' => $pedido->obs,
                'setor' => $setores[$pedido->setor_id]['nome'] ?? '',
                'setor_id' => $pedido->setor_id,
                'situacao' => $pedido->situacao,
                'info' => $pedido->info_pedido,
                'forma_pagamento' => $pedido->forma_pagamento, //remover
                'sac' => $pedido->sac,
                'data_criacao' => date('d/m/y H:i:s', strtotime($pedido->created_at)),
                'modelo' => $pedido->modelo,
                'user_faturamento' => $pedido->user_faturamento
            ],
            'consultor' => [
                'id' => $consultor['id'],
                'nome' => $consultor['nome'],
            ],
            'financeiro' => [
                'is_financeiro' => $isFinanceiro,
                'preco_float' => $pedido->preco_venda,
                'preco' => convert_float_money($pedido->preco_venda),
                'preco_custo' => $precoCusto,
                'imposto' => $isFinanceiro ? $pedido->imposto : null,
                'lucro' => $this->calculoLucro($isFinanceiro, $pedido, $frete),
                'repasse_float' => $pedido->repasse,
                'repasse' => convert_float_money($pedido->repasse),
                'repasse_desconto' => convert_float_money($pedido->repasse_desconto),
                'repasse_total' => $this->calculoRepasse($pedido),
                'valor_nota' => convert_float_money($pedido->preco_venda + $pedido->repasse),
                'forma_pagamento' => $pedido->forma_pagamento,
                'boletos' => (new PedidosArquivos())->getBoletos($pedido->id),
                'cheques' => (new PedidosArquivos())->getCheques($pedido->id),
                'pix' => (new PedidosArquivos())->getPix($pedido->id),
                'link_pagamento' => $files->url_pagamento ?? null,
                'data_faturamento' => $pedido->data_faturamento,
                'nota_numero' => $faturado['nota_numero'] ?? null,
                'tipo_financiamento' => $isFianciamento ? [
                    'tipo_nota' => $dadosFinanciamento ? 'Nota Final' : 'Nota Futura',
                    'banco' => $dadosFinanciamento['banco'] ?? null,
                    'gerente_nome' => $dadosFinanciamento['gerente_nome'] ?? null,
                    'gerente_telefone' => converterTelefone($dadosFinanciamento['gerente_telefone'] ?? null) ?? null,
                    'gerente_email' => $dadosFinanciamento['gerente_email'] ?? null,
                ] : null
            ],
            'frete' => [
                'preco' => $frete->valor_frete ?? null,
                'transportadora_nome' => $frete->transportadora_nome ?? null,
                'transportadora_id' => $frete->transportadora_id ?? null,
                'rastreio' => $frete->rastreio ?? null,
            ],
            'prazos' => [
                'prazo' => date('d/m/y H:i', strtotime("+$pedido->prazo days", strtotime($pedido->status_data))),
                'prazo_atrasado' => $this->getDiferenca($pedido->status_data, $pedido->prazo),
                'prazoDias' => $pedido->prazo,
            ],
            'preco' => [
                'preco_float' => $pedido->preco_venda, // remover
                'convertido' => convert_float_money($pedido->preco_venda), // remover
                'preco_custo_convertido' => $precoCusto, // remover
            ],
            'fornecedor' => [
                'nome' => $fornecedor['nome'] ?? ''
            ],
            'integrador' => [
                'id' => $integrador['id'] ?? '',
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
                    $cliente = (new LeadsANTIGO())->find($pedido->lead_id);
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
            '1' => $this->getVendasMesUsuario($id, 1, $ano),
            '2' => $this->getVendasMesUsuario($id, 2, $ano),
            '3' => $this->getVendasMesUsuario($id, 3, $ano),
            '4' => $this->getVendasMesUsuario($id, 4, $ano),
            '5' => $this->getVendasMesUsuario($id, 5, $ano),
            '6' => $this->getVendasMesUsuario($id, 6, $ano),
            '7' => $this->getVendasMesUsuario($id, 7, $ano),
            '8' => $this->getVendasMesUsuario($id, 8, $ano),
            '9' => $this->getVendasMesUsuario($id, 9, $ano),
            '10' => $this->getVendasMesUsuario($id, 10, $ano),
            '11' => $this->getVendasMesUsuario($id, 11, $ano),
            '12' => $this->getVendasMesUsuario($id, 12, $ano),
        ];
    }

    public function vendasMensaisEmpresa($ano, $setor)
    {
        return [
            '1' => $this->getVendasMesEmpresa(1, $ano, $setor),
            '2' => $this->getVendasMesEmpresa(2, $ano, $setor),
            '3' => $this->getVendasMesEmpresa(3, $ano, $setor),
            '4' => $this->getVendasMesEmpresa(4, $ano, $setor),
            '5' => $this->getVendasMesEmpresa(5, $ano, $setor),
            '6' => $this->getVendasMesEmpresa(6, $ano, $setor),
            '7' => $this->getVendasMesEmpresa(7, $ano, $setor),
            '8' => $this->getVendasMesEmpresa(8, $ano, $setor),
            '9' => $this->getVendasMesEmpresa(9, $ano, $setor),
            '10' => $this->getVendasMesEmpresa(10, $ano, $setor),
            '11' => $this->getVendasMesEmpresa(11, $ano, $setor),
            '12' => $this->getVendasMesEmpresa(12, $ano, $setor),
        ];
    }

    /**
     * @deprecated
     */
    public function _vendasMensaisUsuario($id, $ano)
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
        $items = (new User())->getIdsSubordinados(false, $id, true);

        $nomes = (new User())->getNomes();
        $metas = (new MetasVendas)->getMetasUsuarios($ano);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item]['id'] = $item;
            $dados[$item]['nome'] = $nomes[$item] ?? '';
            $dados[$item]['metas'] = $metas[$item] ?? '';
            $dados[$item]['vendas'] = $this->_vendasMensaisUsuario($item, $ano);
        }
        return [...$dados];
    }


    public function getVendasMesEmpresa($mes, $ano, $setor)
    {
        return (new Pedidos())->newQuery()
            ->where('user_faturamento', '>=', 1)
            ->where('setor_id', $setor)
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereMonth('data_faturamento', $mes)
            ->whereYear('data_faturamento', $ano)
            ->select(DB::raw('
                count(*) as qtd,
                SUM(preco_venda) as vendas,
                SUM(preco_custo) as custos
                '))
            ->first();
    }

    public function prazos($idUsuario = null)
    {
        $query = $this->newQuery();
        if ($idUsuario) $query->where('user_id', $idUsuario);
        $pedidos = $query->get(['id', 'status', 'status_data', 'prazo']);

        $prazosPedidos = [];
        foreach ($pedidos as $pedido) {
            if ($pedido->status !== 'entregue' && $pedido->status !== 'cancelado') {
                $ano = date('Y', strtotime($pedido->status_data));
                $mes = date('m', strtotime($pedido->status_data));
                $dia = date('d', strtotime('+' . $pedido->prazo . ' days', strtotime($pedido->status_data)));

                $prazosPedidos[$ano][intval($mes)][intval($dia)][] = [
                    'id' => $pedido->id,
                    'status' => $pedido->status
                ];
            }
        }
        return $prazosPedidos;
    }

    public function dataPagamento($id): void
    {

        $pedido = $this->newQuery()
            ->find($id);

        $pedido->update(['data_faturamento' => now(), 'user_faturamento' => $pedido->user_id]);
    }

    public function atualizar($id, $dados)
    {
        $query = $this->newQuery()->find($id);

        if ($dados['preco']) $query->update(['preco_venda' => convert_money_float($dados['preco'])]);
        if ($dados['preco_custo']) $query->update(['preco_custo' => convert_money_float($dados['preco_custo'])]);
        if ($dados['repasse']) $query->update(['repasse' => convert_money_float($dados['repasse'])]);
        if ($dados['repasse_desconto']) $query->update(['repasse_desconto' => convert_money_float($dados['repasse_desconto'])]);
        if ($dados['usuario_faturado']) $query->update(['user_faturamento' => $dados['usuario_faturado']]);
        if ($dados['data_faturamento']) $query->update(['data_faturamento' => $dados['data_faturamento']]);
        if ($dados['nota_pedido']) (new PedidosFaturados())->updateNotaPedido($id, $dados['nota_pedido']);
    }

    public function setSac($id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['sac' => 1]);
    }

    public function filtrar($filtros, Builder $query): void
    {
        $filtro = $filtros['filtro'] ?? null;
        $valor = $filtros['filtro_valor'] ?? null;

        if ($filtros['setor'] ?? null) $query->where('pedidos.setor_id', $filtros['setor']);

        if ($valor && $filtro)
            switch ($filtro) {
                case 'id':
                    $query->where('pedidos.id', $valor);
                    break;
                case 'cliente':
                    $query->where('pedidos_clientes.nome', 'LIKE', "%{$valor}%");
                    break;
                case 'consultor':
                    $query->where('users.name', 'LIKE', "%{$valor}%");
                    break;
                case 'integrador':
                    {
                        $query->where(function ($query) use ($valor) {
                            $query->where('leads.nome', 'LIKE', '%' . $valor . '%')
                                ->orWhere('leads.razao_social', 'LIKE', '%' . $valor . '%');
                        });
                    }
                    break;
                case 'cnpj':
                    $query->where('cnpj', 'LIKE', "{$valor}%");
                    break;
            }
    }
}
