<?php

namespace App\Models;

use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;
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
        'nome',
        'setor',
        'cnpj',
        'razao_social',
        'atendente',
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

    public function create($dados, $setor, $pessoa = null)
    {
        try {
            $verificacaoCnpj = null;
            $verificacaoTel = null;

            $telefone = preg_replace('/[^0-9]/', '', $dados['telefone'] ?? null);
            $telefone = preg_replace('/[^0-9]/', '', converterTelefone($telefone) ?? null);
            $cnpj = preg_replace('/[^0-9]/', '', $dados['cnpj'] ?? null);

            if ($cnpj) {
                $verificacaoCnpj = $this->newQuery()
                    ->where('cnpj', $cnpj)
                    ->exists();
            }
            if ($telefone) {
                $verificacaoTel = $this->newQuery()
                    ->orWhere('telefone', $telefone)
                    ->exists();
            }

            if (!$verificacaoCnpj && !$verificacaoTel) {
                $this->newQuery()
                    ->create([
                        'nome' => $dados['nome'] ?? null,
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
        try {
            $this->newQuery()
                ->find($id)
                ->delete();
        } catch (Error) {
        }
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
            $this->newQuery()
                ->find($id)
                ->update([
                    'nome' => $dados->nome,
                    'atendente' => $dados->atendente,
                    'telefone' => $dados->telefone,
                    'razao_social' => $dados->razao_social,
                    'cnpj' => $dados->cnpj,
                    'email' => $dados->email,
                    'cidade' => $dados->cidade,
                    'estado' => $dados->estado,
                ]);
        } catch (QueryException) {
            throw new \DomainException();
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

    public function getPeloStatus($id, string $status, string $order = 'desc')
    {
        $msg = (new LeadsHistoricos())->ultimaMsg();

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
                'nome' => $item->nome,
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
}
