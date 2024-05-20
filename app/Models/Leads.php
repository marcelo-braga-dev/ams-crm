<?php

namespace App\Models;

use App\Services\Excel\RelatorioLeads;
use App\src\Leads\Dados\DadosLeads;
use App\src\Leads\Status\AbertoStatusLeads;
use App\src\Leads\Status\AtendimentoStatusLeads;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;
use App\src\Leads\Status\StatusLeads;
use App\src\Leads\StatusAtendimentoLeads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
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
        'id_importacao',
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
        if ($idImportacao) $query->where('id_importacao', $idImportacao);

        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNomes();

        return $query->where('setor_id', $setor)
            ->where('user_id', '=', null)
            ->where('setor_id', '=', $setor)
//            ->where('status', '=', 'finalizado')
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

    public function setConsultor($idLead, $idConsultor)
    {
        $this->newQuery()
            ->whereIn('id', $idLead)
            ->update([
                'user_id' => $idConsultor,
                'status' => (new AbertoStatusLeads())->getStatus()
            ]);
    }

    public function setSdr($idLead, $idConsultor)
    {
        $this->newQuery()
            ->whereIn('id', $idLead)
            ->update([
                'sdr_id' => $idConsultor,
                'status' => (new NovoStatusLeads())->getStatus()
            ]);
    }

    public function create($dados, $setor, $usuario = null, $importacao = null)
    {
        try {
            $verificacaoCnpj = null;
            $verificacaoTel = null;

            $cnpj = preg_replace('/[^0-9]/', '', $dados['cnpj'] ?? null);

            if ($cnpj) $verificacaoCnpj = $this->newQuery()->where('cnpj', $cnpj)->exists();
            //            if ($telefone) $verificacaoTel = $this->newQuery()->orWhere('telefone', $telefone)->exists();

            $idEndereco = (new Enderecos())->create($dados['endereco'] ?? null);

            $pessoa = ($dados['pessoa'] ?? null) ? !(($dados['pessoa'] ?? null) == 'Pessoa Física') : substr($cnpj, -6, 4) == '0001';

            if (
                !$verificacaoCnpj && !$verificacaoTel &&
                (($dados['nome'] ?? null) || ($dados['razao_social'] ?? null))
            ) {
                $lead = $this->newQuery()
                    ->create([
                        'user_id' => $usuario,
                        'status' => $usuario ? (new AbertoStatusLeads())->getStatus() : (new NovoStatusLeads())->getStatus(),
                        'nome' => $dados['nome'] ?? null,
                        'razao_social' => $dados['razao_social'] ?? null,
                        'cnpj' => $cnpj ?? null,
                        'inscricao_estadual' => $dados['inscricao_estadual'] ?? null,
                        'email' => $dados['email'] ?? null,
                        'id_importacao' => $importacao,
                        'atendente' => $dados['atendente'] ?? null,
                        'setor_id' => $setor,
                        'endereco' => $idEndereco,
                        'pessoa_juridica' => $pessoa,
                        'rg' => $dados['rg'] ?? null,
                        'cpf' => $dados['cpf'] ?? null,
                        'data_nascimento' => $dados['nascimento'] ?? null,
                        'cidade' => $dados['cidade'] ?? $dados['endereco']['cidade'] ?? null,
                        'estado' => $dados['estado'] ?? $dados['endereco']['estado'] ?? null,
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

                $this->cadastrarTelefone($lead->id, $dados['telefone'] ?? null);

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
            throw new \DomainException($exception->getMessage());
        }
    }

    private function cadastrarTelefone($id, $telefone): void
    {
        $items = explode(',', $telefone);

        foreach ($items as $item) {
            $telefone = preg_replace('/[^0-9]/', '', $item);
            $telefone = trim(preg_replace('/[^0-9]/', '', converterTelefone($telefone) ?? null));

            $this->newQuery()->find($id)->update(['telefone' => $telefone]);

            $chaves = (new DadosLeads());
            (new LeadsDados())->create($id, $chaves->chaveTelefone(), $telefone, $chaves->nomeTelefone());
        }
    }

    public function getResumido($setor)
    {
        $nomeConsultores = (new User())->getNomes();

        return $this->newQuery()
            ->where('status', '!=', (new OcultosLeadsStatus())->getStatus())
            ->where('setor_id', $setor)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomeConsultores) {
                return $this->dadosResumido($item, $nomeConsultores);
            });
    }

    public function getConsultores(int $id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->get();
    }

    public function find($id)
    {
        return $this->newQuery()->find($id);
    }

    public function updateStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status' => $status
            ]);
    }

    public function remover(int $id)
    {
        $verificar = (new Pedidos())->newQuery()
            ->where('lead_id', $id)
            ->get('id');

        if ($verificar) {
            try {
                (new LeadsHistoricos())->remover($id);

                $this->newQuery()
                    ->find($id)
                    ->delete();
            } catch (Error) {
            }
            return;
        }

        $msg = '';
        foreach ($verificar as $item) {
            $msg .= '#' . $item->id . '; ';
        }

        throw new \DomainException(
            'Não é possível excluir esse leads pois pessui pedidos emitidos. PEDIDOS IDs ' . $msg
        );
    }

    public function getOcultos($setor)
    {
        return $this->newQuery()
            ->where('status', (new OcultosLeadsStatus())->getStatus())
            ->where('setor_id', $setor)
            ->orderByDesc('id')
            ->get();
    }

    public function getLeadsComConsultor($setor)
    {
        $query = $this->newQuery()
            ->where('user_id', '>', 0)
            ->where('sdr_id', '>', 0)
            ->where('setor_id', $setor)
            ->orderByDesc('id');

        $query->whereIn('user_id', supervisionados(id_usuario_atual()));
        $nomes = (new User())->getNomes();

        return $query->get()
            ->transform(function ($item) use ($nomes) {
                return $this->dadosMinimo($item, $nomes);
            });
    }

    public function atualizar($id, $dados)
    {
        try {
            $verificacaoCnpj = null;
            $verificacaoTel = null;

            $telefone = preg_replace('/[^0-9]/', '', $dados['telefone'] ?? null);
            $telefone = preg_replace('/[^0-9]/', '', converterTelefone($telefone) ?? null);
            $cnpj = preg_replace('/[^0-9]/', '', $dados['cnpj'] ?? null);

            if ($cnpj) $verificacaoCnpj = $this->newQuery()
                ->where('id', '!=', $id)
                ->where('cnpj', $cnpj)
                ->exists();

            if ($telefone) $verificacaoTel = $this->newQuery()
                ->where('id', '!=', $id)
                ->where('telefone', $telefone)
                ->exists();

            if (
                !$verificacaoCnpj && !$verificacaoTel &&
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
                        'cnpj' => $cnpj,
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
        } catch (QueryException) {
            throw new \DomainException('Falha na importação');
        }
    }

    public function atualizarDataStatus(int $id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status_data' => now()]);
    }

    public function qtdLeadsUsuarios($setor = null)
    {
        $query = $this->newQuery();
        $query->whereIn('sdr_id', supervisionados(id_usuario_atual()));
        $query->orWhereIn('user_id', supervisionados(id_usuario_atual()));
        if ($setor) $query->where('setor_id', $setor);

        return $query->get();
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

        return $this->dados($item, $nomes);
    }

    private function dados($item, $nomes = [])
    {
        //$telefones = (new LeadsDados())->dados($item->id, (new DadosLeads())->chaveTelefone());

        return [
            'id' => $item->id,
            'consultor' => [
                'nome' => $nomes[$item->user_id] ?? '',
                'id' => $item->user_id
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
                'telefones' => [], //$telefones,
                'atendente' => $item->atendente,
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
            ],
        ];
    }

    private function dadosMinimo($item, $nomes = [], $setores = [])
    {
        //$telefones = (new LeadsDados())->dados($item->id, (new DadosLeads())->chaveTelefone());

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

        //        $telefones = (new LeadsDados())->dados($item->id, (new DadosLeads())->chaveTelefone());

        return [
            'id' => $item->id,
            'consultor' => [
                'nome' => $nomeConsultores[$item->user_id] ?? '',
                'id' => $item->user_id
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
            'contato' => [
                'email' => $item->email,
                'telefone' => converterTelefone($item->telefone),
                //                'telefones' => $telefones,
                'atendente' => $item->atendente,
            ],
            'infos' => [
                'setor' => $item->setor,
                'status' => $item->status,
                'status_anotacoes' => $item->status_anotacoes,
                'anotacoes' => $item->infos,
                'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                'contato' => $item->meio_contato,
                'data_criacao' => date('d/m/y H:i', strtotime($item->created_at)),
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

    public function qtdLeads()
    {
        return $this->newQuery()
            ->select('user_id', DB::raw('count(*) as qtdUsers'))
            ->groupBy('user_id')
            ->get();
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

    public function getCardDados()
    {
        return $this->newQuery()->pluck('nome', 'id');
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

    public function alterarConsultor($leads, $consultor): void
    {
        try {
            $idLeads = [];
            if (!empty($leads)) {
                foreach ($leads as $item) {
                    $idLeads[] = $item;
                    (new Leads())->setConsultor($item, $consultor);
                }
            }

            // Notificar Leads
            if (count($leads)) (new LeadsNotificacao())->notificar($consultor, count($leads), $idLeads);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
    }

    public function getCards($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->orWhere('sdr_id', $id)
            ->orderBy('status_data', 'desc')
            ->get();
    }

    public function importacao($id)
    {
        return $this->newQuery()
            ->where('id_importacao', $id)
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
        //        $telefones = (new LeadsDados())->telefones(true);

        $dados = $this->newQuery()
            ->where('leads.status', (new AtivoStatusLeads())->getStatus())
            ->where('leads.setor_id', $setor)
            ->leftJoin('users', 'leads.user_id', '=', 'users.id')
            ->leftJoin('pedidos', 'leads.id', '=', 'pedidos.lead_id')
            //            ->leftJoin('leads_dados', 'leads.id', '=', 'leads_dados.lead_id')
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
        $nomes = (new StatusLeads())->nomesStatus();

        return $this->newQuery()
            ->groupBy('status')
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
}
