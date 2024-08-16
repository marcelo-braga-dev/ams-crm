<?php

namespace App\Models;

use App\Services\Excel\RelatorioLeads;
use App\src\Leads\Dados\DadosLeads;
use App\src\Leads\Status\AbertoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\InativoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;
use App\src\Leads\Status\StatusLeads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use DateTime;
use Error;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

class Leads extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sdr_id',
        'status',
        'importacao_id',
        'nome',
        'setor_id',
        'cnpj',
        'razao_social',
        'endereco',
        'atendente',
        'rg',
        'cpf',
        'data_nascimento',
        'inscricao_estadual',
        'pessoa_juridica',
        'email',
        'telefone',
        'cidade',
        'estado',
        'status_data',
        'data_encaminhado',
        'meio_contato',
        'infos',
        'classificacao',
        'anotacoes',
        'ultimo_pedido_data',
        'capital_social',
        'tipo',
        'porte',
        'atividade_principal',
        'natureza_juridica',
        'quadro_societario',
        'data_situacao',
        'data_abertura',
    ];

    public function getDisponiveis($setor, $idImportacao = null)
    {
        $query = $this->newQuery();
        if ($idImportacao) $query->where('importacao_id', $idImportacao);

        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNomes();

        return $query->where('setor_id', $setor)
            ->where('user_id', '=', null)
            ->where('setor_id', '=', $setor)
            ->orderBy('updated_at')
            ->get()
            ->transform(function ($item) use ($nomes, $setores) {
                return $this->dadosMinimo($item, $nomes, $setores);
            });
    }

    public function updateUser($id, $idConsultor)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'user_id' => $idConsultor,
            ]);
    }

    public function setConsultor($idLeads, $idConsultor, $alterarStatus = true)
    {
        $this->newQuery()
            ->whereIn('id', $idLeads)
            ->update([
                'user_id' => $idConsultor,
                'data_encaminhado' => now()
            ]);

        if ($alterarStatus) $this->newQuery()
            ->whereIn('id', $idLeads)
            ->update([
                'status' => (new AbertoStatusLeads())->getStatus()
            ]);

        foreach ($idLeads as $id) {
            (new LeadsHistoricos())->createHistorico($id, (new NovoStatusLeads())->getStatus());
        }
    }

    public function setSdr($idLead, $idConsultor, $alterarStatus = true)
    {
        $this->newQuery()
            ->whereIn('id', $idLead)
            ->update([
                'sdr_id' => $idConsultor,
                'data_encaminhado' => now()
            ]);

        if ($alterarStatus) $this->newQuery()
            ->whereIn('id', $idLead)
            ->update([
                'status' => (new NovoStatusLeads())->getStatus()
            ]);

        foreach ($idLead as $id) {
            (new LeadsHistoricos())->createHistorico($id, (new NovoStatusLeads())->getStatus());
        }
    }

    public function create($dados, $setor, $usuario = null, $importacao = null)
    {
        $cnpj = preg_replace('/[^0-9]/', '', $dados['cnpj'] ?? null);

        try {
            $sdr = null;
            $vendedor = null;
            $status = (new AbertoStatusLeads())->getStatus();
            if ($usuario) {
                $isSdr = is_sdr($usuario);
                $status = $isSdr ? (new NovoStatusLeads())->getStatus() : (new AbertoStatusLeads())->getStatus();
                $isSdr ? $sdr = $usuario : $vendedor = $usuario;
            }
            if ($importacao) $status = (new NovoStatusLeads())->getStatus();

            $verificacaoCnpj = null;

            $idEndereco = (new Enderecos())->create($dados['endereco'] ?? null);

            $pessoa = ($dados['pessoa'] ?? null) ? !(($dados['pessoa'] ?? null) == 'Pessoa Física') : substr($cnpj, -6, 4) == '0001';

            if (($dados['nome'] ?? null) || ($dados['razao_social'] ?? null)) {

                $lead = $this->newQuery()
                    ->create([
                        'user_id' => $vendedor,
                        'sdr_id' => $sdr,
                        'status' => $status,
                        'nome' => $dados['nome'] ?? null,
                        'razao_social' => $dados['razao_social'] ?? null,
                        'cnpj' => $cnpj ?: null,
                        'inscricao_estadual' => $dados['inscricao_estadual'] ?? null,
                        'email' => $dados['email'] ?? null,
                        'importacao_id' => $importacao,
                        'atendente' => $dados['atendente'] ?? null,
                        'setor_id' => $setor,
                        'endereco' => $idEndereco,
                        'pessoa_juridica' => $pessoa,
                        'rg' => $dados['rg'] ?? null,
                        'cpf' => $dados['cpf'] ?? null,
                        'data_nascimento' => $dados['nascimento'] ?? null,
                        'anotacoes' => $dados['anotacoes'] ?? null,
                        'status_data' => now(),
                        'infos' => $dados['infos'] ?? null,

                        'capital_social' => $dados['capital_social'] ?? null,
                        'tipo' => $dados['tipo'] ?? null,
                        'porte' => $dados['porte'] ?? null,
                        'atividade_principal' => $dados['atividade_principal'] ?? null,
                        'natureza_juridica' => $dados['natureza_juridica'] ?? null,
                        'quadro_societario' => $dados['quadro_societario'] ?? null,
                        'data_situacao' => $dados['data_situacao'] ?? null,
                        'data_abertura' => $dados['data_abertura'] ?? null,
                    ]);

                $this->cadastrarTelefone($lead->id, $dados['telefones'] ?? null);

                return $lead->id;
            } else {
                $msgErro = '';
                if ($verificacaoCnpj) {
                    $dados = $this->newQuery()->where('cnpj', $cnpj)->first();
                    $msgErro = ('O LEAD #' . $dados->id . ' POSSUI O MESMO CNPJ: ' . converterCNPJ($dados['cnpj']));
                }
                modalErro($msgErro);
                (new LeadsNotificacao())->notificarDuplicidade($msgErro);
            }
        } catch (QueryException $exception) {
            $existCnpj = $this->newQuery()->where('cnpj', $cnpj)->first();
            if ($existCnpj->id ?? null) throw new \DomainException('CNPJ já cadastrado no LEAD: #' . $existCnpj->id);
        }
    }

    private function cadastrarTelefone($id, $telefones): void
    {
        foreach ($telefones ?? [] as $item) {
            if ($item) {
                $telefone = converterInt(converterTelefone($item));

                $chaves = (new DadosLeads());
                (new LeadsDados())->create($id, $chaves->chaveTelefone(), $telefone, $chaves->nomeTelefone());
            }
        }
    }

    public function getResumido($setor, $comSdr = null, $comConsultor = null, $importacao = null)
    {
        $nomeConsultores = (new User())->getNomes();

        $query = $this->newQuery()
            ->where('status', '!=', (new OcultosLeadsStatus())->getStatus())
            ->where('setor_id', $setor)
            ->orderByDesc('id');

        if ($comSdr) $query->where('sdr_id', '>', 1);
        if ($comConsultor) $query->where('user_id', '>', 1);
        if ($importacao) $query->where('importacao_id', $importacao);

        return $query->get()
            ->transform(function ($item) use ($nomeConsultores) {
                return $this->dadosResumido($item, $nomeConsultores);
            });
    }

    public function find($id)
    {
        return $this->newQuery()
            ->leftJoin('enderecos', 'leads.endereco', '=', 'enderecos.id')
            ->find($id, ['leads.*', 'enderecos.cidade AS cidade', 'enderecos.estado AS estado']);
    }

    public function updateStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status
            ]);
    }

    public function remover($id)
    {
        $ids = is_array($id) ? $id : [$id];

        $verificar = (new Pedidos())->newQuery()
            ->whereIn('lead_id', $ids)
            ->exists();

        if ($verificar) throw new \DomainException('Não é possível excluir esse leads pois pessuem pedidos emitidos.');

        try {
            (new LeadsHistoricos())->remover($id);
            (new Pins())->removerLead($id);

            $this->newQuery()
                ->whereIn('id', $ids)
                ->delete();
        } catch (Error) {
            throw new \DomainException(
                'Erro ao excluir leads!'
            );
        }
    }

    public function getOcultos($setor)
    {
        return $this->newQuery()
            ->where('status', (new OcultosLeadsStatus())->getStatus())
            ->where('setor_id', $setor)
            ->orderByDesc('id')
            ->get();
    }

    public function atualizar($id, $dados)
    {
        $cnpj = preg_replace('/[^0-9]/', '', $dados['cnpj'] ?? null);
        try {
            $verificacaoCnpj = null;
            $verificacaoTel = null;

            $telefone = preg_replace('/[^0-9]/', '', $dados['telefone'] ?? null);
            $telefone = preg_replace('/[^0-9]/', '', converterTelefone($telefone) ?? null);

            if ($telefone) $verificacaoTel = $this->newQuery()
                ->where('id', '!=', $id)
                ->where('telefone', $telefone)
                ->exists();

            if (
                !$verificacaoTel &&
                (($dados['nome'] ?? null) || ($dados['razao_social'] ?? null))
            ) {
                $lead = $this->newQuery()->find($id);
                $idEndereco = $lead->endereco ? (new Enderecos())->updateDados($lead->endereco, $dados->get('endereco')) : (new Enderecos())->create($dados->get('endereco'));

                $this->newQuery()
                    ->find($id)
                    ->update([
                        'nome' => $dados->nome,
                        'atendente' => $dados->atendente,
                        'telefone' => $telefone,
                        'razao_social' => $dados->razao_social,
                        'inscricao_estadual' => $dados->inscricao_estadual,
                        'cnpj' => $cnpj ?: null,
                        'rg' => $dados->rg,
                        'cpf' => $dados->cpf,
                        'email' => $dados->email,
                        'endereco' => $idEndereco,
                        'cidade' => $dados->cidade ?? $lead->cidade,
                        'estado' => $dados->estado ?? $lead->cidade,
                        'data_nascimento' => $dados->nascimento,
                    ]);
                return 1;
            } else {
                $msgErro = '';
                if ($verificacaoCnpj) {
                    $dados = $this->newQuery()->where('cnpj', $cnpj)->first();
                    $msgErro = ('O LEAD #' . $dados->id . ' POSSUI O MESMO CNPJ: ' . converterCNPJ($dados['cnpj']));
                }
                if ($verificacaoTel) {
                    $dados = $this->newQuery()->where('telefone', $telefone)->first();
                    $msgErro = ('O LEAD #' . $dados->id . ' POSSUI O MESMO TELEFONE: ' . converterTelefone($dados['telefone']));
                }
                (new LeadsNotificacao())->notificarDuplicidade($msgErro);
            }
            throw new \DomainException($msgErro);
        } catch (QueryException $exception) {
            $existCnpj = $this->newQuery()->where('cnpj', $cnpj)->exists();
            $msg = $existCnpj ? 'CNPJ já cadastrado!' : 'Error';

            throw new \DomainException($msg);
        }
    }

    public function atualizarDataStatus(int $id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status_data' => now()]);
    }

    public function qtdLeadsUsuarios($id, $setor = null)
    {
        return $this->newQuery()
            ->where('sdr_id', $id)
            ->orWhere('user_id', $id)
            ->select(DB::raw('COUNT(status) as qtd, status'))
            ->groupBy('status')
            ->pluck('qtd', 'status');
    }

    /**
     * @deprecated
     * remover instancia em dados
     */
    public function getPeloStatus($id, string $status, string $order = 'desc', $msg = [])
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->where('status', $status)
            ->orderBy('status_data', $order)
            ->get()
            ->transform(function ($item) use ($msg) {
                return $this->dados($item, $msg);
            });
    }

    public function getDados($id)
    {
        $item = $this->newQuery()->find($id);
        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNomes();
        $telefones = (new LeadsDados())->dados($item->id, (new DadosLeads())->chaveTelefone());

        return $this->dados($item, $nomes, $setores, $telefones);
    }

    private function dados($item, $nomes = [], $setores = [], $telefones = [])
    {
        if ($item)

            return [
                'id' => $item->id,
                'consultor' => [
                    'nome' => $nomes[$item->user_id] ?? '',
                    'id' => $item->user_id
                ],
                'sdr' => [
                    'nome' => $nomes[$item->sdr_id] ?? '',
                    'id' => $item->sdr_id
                ],
                'cliente' => [
                    'nome' => $item->nome,
                    'razao_social' => $item->razao_social,
                    'cnpj' => converterCNPJ($item->cnpj),
                    'rg' => $item->rg,
                    'cpf' => $item->cpf,
                    'cidade' => $item->cidade,
                    'estado' => $item->estado,
                    'endereco' => $item->endereco ? getEnderecoCompleto($item->endereco) : '',
                    'pessoa' => $item->pessoa_fisica ? 'PF' : 'PJ',
                    'classificacao' => $item->classificacao
                ],
                'dados' => [
                    'capital_social' => $item->capital_social,
                    'tipo' => $item->tipo,
                    'porte' => $item->porte,
                    'atividade_principal' => $item->atividade_principal,
                    'natureza_juridica' => $item->natureza_juridica,
                    'quadro_societario' => $item->quadro_societario,
                    'data_situacao' => $item->data_situacao,
                    'data_abertura' => $item->data_abertura,
                ],
                'contato' => [
                    'email' => $item->email,
                    'telefone' => converterTelefone($item->telefone),
                    'telefones' => $telefones,
                    'atendente' => $item->atendente,
                ],
                'infos' => [
                    'setor' => $setores[$item->setor_id] ?? '',
                    'status' => $item->status,
                    'status_nome' => (new StatusLeads())->nome($item->status),
                    'status_anotacoes' => $item->status_anotacoes,
                    'anotacoes' => $item->infos,
                    'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                    'contato' => $item->meio_contato,
                    'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
                ],
            ];
    }

    private function dadosMinimo($item, $nomes = [], $setores = [])
    {
        return [
            'id' => $item->id,
            'consultor' => [
                'nome' => $nomes[$item->user_id] ?? '',
                'id' => $item->user_id
            ],
            'sdr' => [
                'nome' => $nomes[$item->sdr_id] ?? '',
                'id' => $item->sdr_id
            ],
            'cliente' => [
                'nome' => $item->nome,
                'razao_social' => $item->razao_social,
                'cnpj' => converterCNPJ($item->cnpj),
                'rg' => $item->rg,
                'cpf' => $item->cpf,
                'cidade' => $item->cidade,
                'estado' => $item->estado,
                'classificacao' => $item->classificacao
            ],
            'contato' => [
                'email' => $item->email,
                'telefone' => converterTelefone($item->telefone),
                'telefones' => [], //$telefones,
            ],
            'infos' => [
                'setor' => $setores[$item->setor_id]['nome'] ?? '',
                'status' => $item->status,
                'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
            ],
        ];
    }

    private function dadosResumido($item, $nomeConsultores = []): array
    {
        if (!$item) return [];

        return [
            'id' => $item->id,
            'consultor' => [
                'nome' => $nomeConsultores[$item->user_id] ?? '',
                'id' => $item->user_id
            ],
            'sdr' => [
                'nome' => $nomeConsultores[$item->sdr_id] ?? '',
                'id' => $item->sdr_id
            ],
            'cliente' => [
                'nome' => $item->nome,
                'razao_social' => $item->razao_social,
                'cnpj' => converterCNPJ($item->cnpj),
                'rg' => $item->rg,
                'cpf' => $item->cpf,
                'cidade' => $item->cidade,
                'estado' => $item->estado,
                'endereco' => '',//$item->endereco ? getEnderecoCompleto($item->endereco) : '',
                'pessoa' => $item->pessoa_fisica ? 'PF' : 'PJ',
                'classificacao' => $item->classificacao
            ],
            'contato' => [
                'email' => $item->email,
                'telefone' => converterTelefone($item->telefone),
                //                'telefones' => $telefones,
            ],
            'infos' => [
                'setor' => $item->setor,
                'status' => $item->status,
                'status_nome' => (new StatusLeads())->nome($item->status),
                'status_anotacoes' => $item->status_anotacoes,
                'anotacoes' => $item->infos,
                'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                'contato' => $item->meio_contato,
                'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
                'pedido_emitido' => $item->pedido_emitido
            ],
        ];
    }

    public function updateClassificacao($id, $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'classificacao' => $valor
            ]);
    }

    public function qtdLeadsStatusConsultor($idConsultor): array
    {
        $dados = $this->newQuery()
            ->where('user_id', $idConsultor)
            ->select('status', DB::raw('COUNT(*) as qtd'))
            ->groupBy('status')
            ->get();

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->status] = $dado->qtd ?? 0;
        }
        return $items;
    }

    public function getNomes()
    {
        $items = $this->newQuery()
            ->get(['id', 'nome', 'razao_social']);

        $dados = [];
        foreach ($items as $dado) {
            $dados[$dado->id] = $dado->nome ? $dado->nome : $dado->razao_social;
        }

        return $dados;
    }

    public function getCards($id)
    {
        $nomes = (new User())->getNomes();

        return $this->newQuery()
            ->leftJoin('pins', 'leads.id', '=', DB::raw('pins.lead_id AND pins.user_id = ' . id_usuario_atual()))
            ->where('leads.user_id', $id)
            ->orWhere('leads.sdr_id', $id)
            ->orderByDesc('pin')
            ->orderByDesc('pedido_dias')
            ->orderByDesc('status_data')
            ->get(['leads.id', 'status', 'leads.user_id', 'sdr_id', 'nome', 'razao_social', 'cnpj', 'cnpj', 'telefone', 'status_data', 'classificacao',
                DB::raw('CASE WHEN pins.user_id = ' . id_usuario_atual() . ' THEN TRUE ELSE FALSE END as pin'),
                DB::raw('DATEDIFF(CURDATE(), leads.ultimo_pedido_data) as pedido_dias'),
                DB::raw('DATEDIFF(CURDATE(), leads.status_data) as status_dias')])
            ->transform(function ($item) use ($nomes) {
                return [
                    'pin' => !!$item->pin,
                    'status' => $item->status,
                    'id' => $item->id,
                    'consultor' => $nomes[$item->user_id] ?? '',
                    'sdr_nome' => $nomes[$item->sdr_id] ?? '',
                    'cliente' => [
                        'nome' => $item->nome ?: $item->razao_social,
                        'cnpj' => converterCNPJ($item->cnpj),
                        'cidade' => $item->cidade,
                        'estado' => $item->estado,
                        'classificacao' => $item->classificacao,
                    ],
                    'contato' => [
                        'email' => $item->email,
                        'telefone' => converterTelefone($item->telefone),
                    ],
                    'infos' => [
                        'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                        'pedido_dias' => $item->pedido_dias,
                        'status_dias' => $item->status_dias,
                    ],
                ];
            });
    }

    public function importacao($id)
    {
        return $this->newQuery()
            ->where('importacao_id', $id)
            ->get()
            ->transform(function ($item) {
                return $this->dados($item);
            });
    }

    public function atualizarDataUltimoPedido($id): void
    {
        if ($id) $this->newQuery()
            ->find($id)
            ->update(['ultimo_pedido_data' => now()]);
    }

    public function relatorio($setor)
    {
        $dados = $this->newQuery()
            ->where('leads.status', (new AtivoStatusLeads())->getStatus())
            ->where('leads.setor_id', $setor)
            ->leftJoin('users', 'leads.user_id', '=', 'users.id')
            ->leftJoin('pedidos', 'leads.id', '=', 'pedidos.lead_id')
            ->select(DB::raw('
                leads.id as lead_id, leads.nome, razao_social, cnpj, cpf, name as consultor,
                telefone, pedidos.created_at as pedido_data,
                SUM(preco_venda) as vendas, COUNT(pedidos.id) as pedidos_qtd
                '))
            ->groupBy('leads.id')
            ->orderByDesc('pedidos.created_at')
            ->get()
            ->transform(function ($item) {
                return [
                    'lead_id' => $item->lead_id,
                    'lead_nome' => $item->nome,
                    'razao_social' => $item->razao_social,
                    'cnpj' => converterCNPJ($item->cnpj),
                    'cpf' => $item->cpf,
                    'telefone' => converterTelefone($item->telefone),
                    'consultor_nome' => $item->consultor,
                    'pedido_data' => date('d/m/Y', strtotime($item->pedido_data)),
                    'pedidos_qtd' => $item->pedidos_qtd,
                    'pedidos_vendas' => $item->vendas,
                ];
            });

        return (new RelatorioLeads())->gerar($dados);
    }

    public function limparFinalizados($id)
    {
        $this->newQuery()
            ->where('user_id', $id)
            ->where('status', (new FinalizadoStatusLeads)->getStatus())
            ->update([
                'user_id' => null,
                'status' => (new NovoStatusLeads())->getStatus()
            ]);

        $this->newQuery()
            ->where('sdr_id', $id)
            ->where('status', (new FinalizadoStatusLeads)->getStatus())
            ->update([
                'sdr_id' => null,
                'status' => (new NovoStatusLeads())->getStatus()
            ]);
    }

    public function relatorioLeads()
    {
        $status = (new StatusLeads())->nomesStatus();

        $items = $this->newQuery()
            ->groupBy('status')
            ->whereNotNull('user_id')
            ->orWhereNotNull('sdr_id')
            ->select(DB::raw('
                status, COUNT(id) as qtd
            '))
            ->pluck('qtd', 'status');

        return [
            ['status' => $status['novo'] ?? '', 'qtd' => $items['novo'] ?? 0],
            ['status' => $status['pre_atendimento'] ?? '', 'qtd' => $items['pre_atendimento'] ?? 0],
            ['status' => $status['aberto'] ?? '', 'qtd' => $items['aberto'] ?? 0],
            ['status' => $status['atendimento'] ?? '', 'qtd' => $items['atendimento'] ?? 0],
            ['status' => $status['ativo'] ?? '', 'qtd' => $items['ativo'] ?? 0],
            ['status' => $status['finalizado'] ?? '', 'qtd' => $items['finalizado'] ?? 0],
        ];
    }

    public function relatorioUsuarios($id)
    {
        $nomes = (new StatusLeads())->nomesStatus();

        return $this->newQuery()
            ->groupBy('status')
            ->where('sdr_id', $id)
            ->select(DB::raw('
                status, COUNT(id) as qtd
            '))
            ->get()
            ->transform(function ($item) use ($nomes) {
                return [
                    'status' => $nomes[$item->status] ?? '?',
                    'qtd' => $item->qtd,
                ];
            });
    }

    public function removerConsultor($id)
    {
        $ids = is_array($id) ? $id : [$id];

        $this->newQuery()
            ->whereIn('id', $ids)
            ->update([
                'user_id' => null,
            ]);

        $this->newQuery()
            ->whereIn('id', $ids)
            ->where('status', '!=', (new AtivoStatusLeads)->getStatus())
            ->update([
                'status' => (new NovoStatusLeads())->getStatus()
            ]);
    }

    public function removerSdr($id)
    {
        $ids = is_array($id) ? $id : [$id];

        $this->newQuery()
            ->whereIn('id', $ids)
            ->update([
                'sdr_id' => null
            ]);

        $this->newQuery()
            ->whereIn('id', $ids)
            ->where('status', '!=', (new AtivoStatusLeads)->getStatus())
            ->update([
                'status' => (new NovoStatusLeads())->getStatus()
            ]);
    }

    public function getDadosMinimo($setor, $comSdr = null, $comConsultor = null, $importacao = null)
    {
        $nomeConsultores = (new User())->getNomes();

        $query = $this->newQuery()
            ->where('setor_id', $setor)
            ->orderBy('data_encaminhado')
            ->orderBy('created_at');

        if ($comSdr) $query->whereNull('sdr_id',);
        if ($comConsultor) $query->whereNull('user_id');
        if ($importacao) $query->where('importacao_id', $importacao);

        return $query->get()
            ->transform(function ($item) use ($nomeConsultores) {
                return [
                    'id' => $item->id,
                    'consultor' => [
                        'nome' => $nomeConsultores[$item->user_id] ?? '',
                        'id' => $item->user_id
                    ],
                    'sdr' => [
                        'nome' => $nomeConsultores[$item->sdr_id] ?? '',
                        'id' => $item->sdr_id
                    ],
                    'cliente' => [
                        'nome' => $item->nome,
                        'razao_social' => $item->razao_social,
                        'cnpj' => converterCNPJ($item->cnpj),
                        'rg' => $item->rg,
                        'cpf' => $item->cpf,
                        'cidade' => $item->cidade,
                        'estado' => $item->estado,
                        'classificacao' => $item->classificacao
                    ],
                    'contato' => [
                        'email' => $item->email,
                        'telefone' => converterTelefone($item->telefone),
                    ],
                    'infos' => [
                        'setor' => $item->setor,
                        'status' => $item->status,
                        'status_nome' => (new StatusLeads())->nome($item->status),
                        'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                        'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
                        'pedido_emitido' => $item->pedido_emitido,
                        'encaminhado_data' => $item->data_encaminhado ? date('d/m/y H:i', strtotime($item->data_encaminhado)) : null,
                    ]
                ];
            });
    }

    public function getDadosMinimoPaginate($setor, $filtros)
    {
        $nomeConsultores = (new User())->getNomes();
        $setores = (new Setores())->getNomes();

        $query = $this->newQuery()->where('setor_id', $setor);

        $orderBy = $filtros['ordenar_by'] ?? 'ASC';
        switch ($filtros['ordenar'] ?? null) {
            case 'id' :
                $query->orderBy('id', $orderBy);
                break;
            case 'nome' :
                $query->orderBy('nome', $orderBy);
                break;
            case 'razao_social' :
                $query->orderBy('razao_social', $orderBy)->whereNotNull('razao_social');
                break;
            default :
                $query->orderBy('data_encaminhado', $orderBy)
                    ->orderBy('created_at');
                break;
        }

        if ($filtros['sdr'] ?? null) $query->whereNull('sdr_id');
        if ($filtros['consultor'] ?? null) $query->whereNull('user_id');
        if ($filtros['importacao'] ?? null) $query->where('importacao_id', $filtros['importacao']);
        if ($filtros['status'] ?? null) $query->where('status', $filtros['status']);
        if ($filtros['classificacao'] ?? null) $query->where('classificacao', $filtros['classificacao']);
        if ($filtros['leads'] ?? null) {
            if ($filtros['leads'] == 'novos') $query->whereNull('data_encaminhado');
            if ($filtros['leads'] == 'atendidos') $query->whereNotNull('data_encaminhado');
            if ($filtros['leads'] == 'ativados') $query->whereNotNull('ultimo_pedido_data');
        }

        $this->filtrar($filtros, $query);

        $items = $query->paginate($filtros['page_qtd'] ?? 50);

        $dados = $items->transform(function ($item) use ($nomeConsultores, $setores) {
            return [
                'id' => $item->id,
                'consultor' => [
                    'nome' => $nomeConsultores[$item->user_id] ?? '',
                    'id' => $item->user_id
                ],
                'sdr' => [
                    'nome' => $nomeConsultores[$item->sdr_id] ?? '',
                    'id' => $item->sdr_id
                ],
                'cliente' => [
                    'nome' => $item->nome,
                    'razao_social' => $item->razao_social,
                    'cnpj' => converterCNPJ($item->cnpj),
                    'rg' => $item->rg,
                    'cpf' => $item->cpf,
                    'cidade' => $item->cidade,
                    'estado' => $item->estado,
                    'classificacao' => $item->classificacao
                ],
                'contato' => [
                    'telefone' => converterTelefone($item->telefone),
                ],
                'infos' => [
                    'setor' => $setores[$item->setor_id]['nome'] ?? '',
                    'status' => $item->status,
                    'status_nome' => (new StatusLeads())->nomeCor($item->status),
                    'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                    'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
                    'pedido_emitido' => $item->pedido_emitido,
                    'encaminhado_data' => $item->data_encaminhado ? date('d/m/y H:i', strtotime($item->data_encaminhado)) : null,
                    'status_periodo' => $this->difData($item->status_data),
                    'pedido_data' => $item->ultimo_pedido_data ? date('d/m/y H:i', strtotime($item->ultimo_pedido_data)): null,
                    'pedido_periodo' => $this->difData($item->ultimo_pedido_data)
                ]
            ];
        });

        return ['dados' => $dados, 'paginate' => ['current' => $items->currentPage(), 'last_page' => $items->lastPage(), 'total' => $items->total()]];
    }

    private function difData($data)
    {
        $dataInicio = new DateTime($data);
        $dataAtual = new DateTime();
        return $dataInicio->diff($dataAtual)->days;
    }

    public function limparStatus(int $id, string $status)
    {
        $this->newQuery()
            ->where('user_id', $id)
            ->where('status', $status)
            ->update([
                'user_id' => null,
                'status' => (new NovoStatusLeads())->getStatus()
            ]);

        $this->newQuery()
            ->where('sdr_id', $id)
            ->where('status', $status)
            ->update([
                'sdr_id' => null,
                'status' => (new NovoStatusLeads())->getStatus()
            ]);
    }

    public function filtrar($filtros, \Illuminate\Database\Eloquent\Builder $query): void
    {
        $filtro = $filtros['filtro'] ?? null;
        $valor = $filtros['filtro_valor'] ?? null;

        if ($valor && $filtro)
            switch ($filtro) {
                case 'id':
                    $query->where('id', $valor);
                    break;
                case 'nome':
                    {
                        $query->where(function ($query) use ($valor) {
                            $query->where('nome', 'LIKE', '%' . $valor . '%')
                                ->orWhere('razao_social', 'LIKE', '%' . $valor . '%');
                        });
                    }
                    break;
                case 'cnpj':
                    $query->where('cnpj', 'LIKE', "{$valor}%");
                    break;
                case 'cidade':
                    $query->where('cidade', 'LIKE', "{$valor}%");
                    break;
                case 'ddd':
                    $query->where('telefone', 'LIKE', "55{$valor}%");
                    break;
                case 'telefone':
                    $query->where('telefone', 'LIKE', "%{$valor}%");
                    break;
            }
    }

    public function removerImportacao($id)
    {
        $this->newQuery()
            ->where('importacao_id', $id)
            ->delete();

        (new LeadsImportarHistoricos())->newQuery()->find($id)->delete();
    }

    public function inativar($id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => (new InativoStatusLeads())->getStatus()]);

        (new LeadsHistoricos())->createHistorico($id, (new InativoStatusLeads())->getStatus());
    }

    public function reativar(mixed $id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => (new AtivoStatusLeads())->getStatus()]);
    }
}

