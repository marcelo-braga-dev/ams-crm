<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class Clientes extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'setor',
        'nome',
        'data_nascimento',
        'razao_social',
        'inscricao_estadual',
        'endereco',
        'telefone',
        'email',
        'cpf',
        'rg',
        'cnpj',
    ];

    public function getClientes($setor)
    {
        return $this->newQuery()
            ->where('users_id', id_usuario_atual())
            ->where('setor', $setor)
            ->get(['id', 'nome', 'razao_social'])
            ->transform(function ($dado) {
                return [
                    'id' => $dado->id,
                    'nome' => $dado->nome ?? $dado->razao_social,
                ];
            });
    }

    public function create($dados)
    {
        $idEndereco = (new Enderecos())->create($dados->get('endereco'));

        try {
            $dados = $this->newQuery()
                ->create([
                    'users_id' => id_usuario_atual(),
                    'setor' => setor_usuario_atual(),
                    'nome' => $dados->nome,
                    'razao_social' => $dados->razao_social,
                    'endereco' => $idEndereco,
                    'telefone' => $dados->telefone,
                    'email' => $dados->email,
                    'cpf' => $dados->cpf,
                    'rg' => $dados->rg,
                    'cnpj' => $dados->cnpj,
                    'inscricao_estadual' => $dados->inscricao_estadual,
                    'data_nascimento' => $dados->nascimento,
                ]);
            return $dados->id;
        } catch (QueryException $exception) {
            throw new \DomainException('Falha no cadastro do cliente.');
        }
    }

    public function getCardDados()
    {
        $items = $this->newQuery()->get([
            'id', 'nome', 'razao_social', 'telefone', 'email'
        ]);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->id] = [
                'nome' => $item->nome ?? $item->razao_social,
                'telefone' => $item->telefone,
                'email' => $item->email
            ];
        }
        return $dados;
    }

    public function getCliente(int $id)
    {
        $dados = $this->newQuery()->find($id);
        return $this->dados($dados);
    }

    private function dados($dados) : array
    {
        return [
            'users_id' => $dados->users_id,
            'setor' => $dados->setor,
            'nome' => $dados->nome ?? $dados->razao_social,
            'endereco' => getEnderecoCompleto($dados->endereco),
            'telefone' => converterTelefone($dados->telefone),
            'email' => $dados->email,
            'cpf' => $dados->cpf,
            'rg' => $dados->rg,
            'cnpj' => $dados->cnpj,
            'inscricao_estadual' => $dados->inscricao_estadual,
            'data_nascimento' => date('d/m/Y', strtotime($dados->data_nascimento)),
        ];
    }
}
