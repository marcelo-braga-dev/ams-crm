<?php

namespace App\Models;

use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;
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
        'status',
        'importacao',
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
        'pedido_emitido'
    ];

    public function getDisponiveis($setor)
    {
        $query = $this->newQuery()
            ->where('status', '=', (new NovoStatusLeads())->getStatus())
            ->where('setor_id', $setor)
            ->where('user_id', '=', null)
            ->orderByDesc('id');

//        if (is_supervisor()) $query->whereIn('user_id', (new User())->getIdsConsultoresSupervisor(true));

        return $query->get();
    }

    public function setConsultor($idLead, $idConsultor)
    {
        $this->newQuery()
            ->where('id', $idLead)
            ->update([
                'user_id' => $idConsultor,
                'status' => (new NovoStatusLeads())->getStatus()
            ]);
    }

    public function create($dados, $setor, $usuario = null, $importacao = null)
    {
        try {
            $verificacaoCnpj = null;
            $verificacaoTel = null;

            $telefone = preg_replace('/[^0-9]/', '', $dados['telefone'] ?? null);
            $telefone = preg_replace('/[^0-9]/', '', converterTelefone($telefone) ?? null);
            $cnpj = preg_replace('/[^0-9]/', '', $dados['cnpj'] ?? null);

            if ($cnpj) $verificacaoCnpj = $this->newQuery()->where('cnpj', $cnpj)->exists();
            if ($telefone) $verificacaoTel = $this->newQuery()->orWhere('telefone', $telefone)->exists();

            $idEndereco = (new Enderecos())->create($dados->endereco ?? null);

            $pessoa = ($dados['pessoa'] ?? null) ? !(($dados['pessoa'] ?? null) == 'Pessoa Física') : substr($cnpj, -6, 4) == '0001';

            if (!$verificacaoCnpj && !$verificacaoTel &&
                (($dados['nome'] ?? null) || ($dados['razao_social'] ?? null))) {
                $this->newQuery()
                    ->create([
                        'user_id' => $usuario,
                        'nome' => $dados['nome'] ?? null,
                        'importacao' => $importacao,
                        'atendente' => $dados['atendente'] ?? null,
                        'telefone' => $telefone,
                        'setor_id' => $setor,
                        'endereco' => $idEndereco,
                        'pessoa_juridica' => $pessoa,
                        'razao_social' => $dados['razao_social'] ?? null,
                        'inscricao_estadual' => $dados['inscricao_estadual'] ?? null,
                        'cnpj' => $cnpj ?? null,
                        'rg' => $dados['rg'] ?? null,
                        'cpf' => $dados['cpf'] ?? null,
                        'email' => $dados['email'] ?? null,
                        'data_nascimento' => $dados['nascimento'] ?? null,
                        'cidade' => $dados['cidade'] ?? $dados['endereco']['cidade'] ?? null,
                        'estado' => $dados['estado'] ?? $dados['endereco']['estado'] ?? null,
                        'anotacoes' => $dados['anotacoes'] ?? null,
                        'status_data' => now(),
                        'infos' => $dados['infos'] ?? null,
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
                modalErro($msgErro);
                (new LeadsNotificacao())->notificarDuplicidade($msgErro);
            }
        } catch (QueryException $exception) {
            throw new \DomainException('Falha na importação');
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
            ->where('setor_id', $setor)
            ->orderByDesc('id');
        if (is_supervisor()) $query->whereIn('user_id', (new User())->getIdsConsultoresSupervisor(true));
        return $query->get();
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

            if (!$verificacaoCnpj && !$verificacaoTel &&
                (($dados['nome'] ?? null) || ($dados['razao_social'] ?? null))) {
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

    public function qtdLeadsUsuarios()
    {
        $query = $this->newQuery()
            ->where('user_id', '>', 0);

        if (is_supervisor()) $query->whereIn('user_id', (new User())->getIdsConsultoresSupervisor(true))
            ->orWhere('user_id', id_usuario_atual());

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

        return $this->dados($item);
    }

    private function dados($item, $msg = [])
    {
        $nomes = (new User())->getNomeConsultores();
        return [
            'id' => $item->id,
            'consultor' => [
                'nome' => $this->consultores[$item->user_id] ?? '',
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

    private function dadosResumido($item, $nomeConsultores = []): array
    {
        if (!$item) return [];

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
            ->orderBy('status_data', 'desc')
            ->get();
    }
}
