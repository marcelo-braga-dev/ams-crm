<?php

namespace App\Models;

use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\OcultosLeadsStatus;
use Error;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class Leads extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'status',
        'nome',
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
        'created_at_'
    ];

    public function getDisponiveis()
    {
        return $this->newQuery()
            ->where('status', '=', (new NovoStatusLeads())->getStatus())
            ->where('users_id', '=', null)
            ->orderByDesc('id')
            ->get();
    }

    public
    function setConsultor($idLead, $idConsultor)
    {
        $this->newQuery()
            ->where('id', $idLead)
            ->update(['users_id' => $idConsultor]);
    }

    public
    function create($dados, $pessoa = null)
    {
        try {
            $this->newQuery()
                ->create([
                    'nome' => $dados['nome'] ?? null,
                    'atendente' => $dados['atendente'] ?? null,
                    'telefone' => $dados['telefone'] ?? null,
                    'pessoa_fisica' => $pessoa,
                    'razao_social' => $dados['razao_social'] ?? null,
                    'cnpj' => $dados['cnpj'] ?? null,
                    'email' => $dados['email'] ?? null,
                    'cidade' => $dados['cidade'] ?? null,
                    'estado' => $dados['estado'] ?? null,
                    'anotacoes' => $dados['anotacoes'] ?? null,
                    'status_data' => now(),
                    'infos' => $dados['infos'] ?? null,
                ]);
        } catch (QueryException) {
            throw new \DomainException();
        }
    }

    public function getAll()
    {
        return $this->newQuery()
            ->where('status', '!=', (new OcultosLeadsStatus())->getStatus())
            ->orderByDesc('id')->get();
    }

    public
    function getConsultores()
    {
        return $this->newQuery()
            ->where('users_id', auth()->id())
            ->get();
    }

    public
    function find($id)
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

    public function getOcultos()
    {
        return $this->newQuery()
            ->where('status', (new OcultosLeadsStatus())->getStatus())
            ->get();
    }

    public function getLeadsComConsultor()
    {
        return $this->newQuery()
            ->where('users_id', '>', 0)
            ->get();
    }
}
