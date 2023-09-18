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
        'users_id',
        'status',
        'importacao',
        'nome',
        'setor',
        'cnpj',
        'razao_social',
        'endereco',
        'atendente',
        'rg',
        'cpf',
        'data_nascimento',
        'inscricao_estadual',
        'pessoa_fisica',
        'email',
        'telefone',
        'cidade',
        'estado',
        'status_data',
        'meio_contato',
        'infos',
        'classificacao'
    ];

    public function getDisponiveis($setor)
    {
        return $this->newQuery()
            ->where('status', '=', (new NovoStatusLeads())->getStatus())
            ->where('setor', $setor)
            ->where('users_id', '=', null)
            ->orderByDesc('id')
            ->get();
    }

    public function setConsultor($idLead, $idConsultor)
    {
        $this->newQuery()
            ->where('id', $idLead)
            ->update([
                'users_id' => $idConsultor,
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

            if (!$verificacaoCnpj && !$verificacaoTel &&
                (($dados['nome'] ?? null) || ($dados['razao_social'] ?? null))) {
                $this->newQuery()
                    ->create([
                        'users_id' => $usuario,
                        'nome' => $dados['nome'] ?? null,
                        'importacao' => $importacao,
                        'atendente' => $dados['atendente'] ?? null,
                        'telefone' => $telefone,
                        'setor' => $setor,
                        'razao_social' => $dados['razao_social'] ?? null,
                        'cnpj' => $cnpj ?? null,
                        'email' => $dados['email'] ?? null,
                        'cidade' => $dados['cidade'] ?? null,
                        'estado' => $dados['estado'] ?? null,
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

    public function getAll($setor)
    {
        return $this->newQuery()
            ->where('status', '!=', (new OcultosLeadsStatus())->getStatus())
            ->where('setor', $setor)
            ->orderByDesc('id')->get();
    }

    public function getConsultores(int $id)
    {
        return $this->newQuery()
            ->where('users_id', $id)
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
            ->where('lead', $id)
            ->get();

        if ($verificar->isEmpty()) {
            try {
                $this->newQuery()
                    ->find($id)
                    ->delete();
            } catch (Error) {
            }
            return;
        }

        $msg = '';
        foreach ($verificar as $item) {
            $msg .= '#'. $item->id . '; ';
        }

        throw new \DomainException(
            'Não é possível excluir esse leads pois pessui pedidos emitidos. PEDIDOS IDs ' . $msg
        );
    }

    public function getOcultos($setor)
    {
        return $this->newQuery()
            ->where('status', (new OcultosLeadsStatus())->getStatus())
            ->where('setor', $setor)
            ->orderByDesc('id')
            ->get();
    }

    public function getLeadsComConsultor($setor)
    {
        return $this->newQuery()
            ->where('users_id', '>', 0)
            ->where('setor', $setor)
            ->orderByDesc('id')
            ->get();
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
        return $this->newQuery()
            ->where('users_id', '>', 0)
            ->get();
    }

    public function getPeloStatus($id, string $status, string $order = 'desc', $msg = [])
    {
        return $this->newQuery()
            ->where('users_id', $id)
            ->where('status', $status)
            ->orderBy('status_data', $order)
            ->get()
            ->transform(function ($item) use ($msg) {
                return $this->dados($item, $msg);
            });
    }

    private function dados($item, $msg = [])
    {
        $nomes = (new User())->getNomeConsultores();
        return [
            'id' => $item->id,

            'consultor' => [
                'nome' => $nomes[$item->users_id] ?? '-'
            ],

            'cliente' => [
                'nome' => $item->nome ?: $item->razao_social,
                'cidade' => $item->cidade,
                'estado' => $item->estado,
                'pessoa' => $item->pessoa_fisica ? 'PF' : 'PJ',
                'classificacao' => $item->classificacao
            ],

            'contato' => [
                'email' => $item->email,
                'telefone' => converterTelefone($item->telefone),
                'atendente' => $item->atendente,
            ],

            'infos' => [
                'status' => $item->status,
                'status_anotacoes' => $item->status_anotacoes,
                'anotacoes' => $item->infos,
                'ultima_msg' => $msg[$item->id]['msg'] ?? null,
                'data_ultima_msg' => $msg[$item->id]['data'] ?? null,
                'status_data' => date('d/m/y H:i', strtotime($item->status_data)),
                'contato' => $item->meio_contato,
                'data_criacao' => date('d/m/y H:i', strtotime($item->updated_at)),
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
            ->select('users_id', DB::raw('count(*) as qtdUsers'))
            ->groupBy('users_id')
            ->get();
    }

    public function qtdLeadsStatusConsultor($idConsultor): array
    {
        $dados = $this->newQuery()
            ->where('users_id', $idConsultor)
            ->select('status', DB::raw('COUNT(*) as qtd'))
            ->groupBy('status')
            ->get();

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->status] = $dado->qtd ?? 0;
        }
        return $items;
    }

    public function getCardDados(): array
    {
        $items = $this->newQuery()->get(['id', 'nome']);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->id] = $item->nome;
        }

        return $dados;
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
}
