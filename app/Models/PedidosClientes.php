<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class PedidosClientes extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = [
        'pedido_id',
        'user_id',
        'nome',
        'data_nascimento',
        'razao_social',
        'endereco',
        'telefone',
        'email',
        'cpf',
        'rg',
        'cnpj',
        'inscricao_estadual',
    ];

    public function create($id, $dados)
    {
        $idEndereco = (new Enderecos())->create($dados->get('endereco'));

        try {
            $this->newQuery()
                ->create([
                    'pedido_id' => $id,
                    'user_id' => id_usuario_atual(),
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
        } catch (QueryException $exception) {print_pre($exception->getMessage());
            throw new \DomainException('Falha no cadastro do clienteXxX.');
        }
    }

    public function find(int $id)
    {
        return $this->newQuery()
            ->where('pedido_id', $id)->first();
    }

    public function atualizar(int $id, $dados)
    {
        $dadosAtualCliente = (new PedidosClientes())->find($id);

        (new Enderecos())->updateDados($dadosAtualCliente->endereco, $dados->get('endereco'));

        $this->newQuery()
            ->where('pedido_id', $id)
            ->update([
                'nome' => $dados->nome,
                'razao_social' => $dados->razao_social,
                'telefone' => $dados->telefone,
                'email' => $dados->email,
                'cpf' => $dados->cpf,
                'rg' => $dados->rg,
                'cnpj' => $dados->cnpj,
                'data_nascimento' => $dados->nascimento,
                'inscricao_estadual' => $dados->inscricao_estadual,
            ]);
    }

    public function getNomeCliente($id)
    {
        $cliente = $this->newQuery()->where('pedido_id', $id)->first();
        if ($cliente === null) return 'Não Encontrado';
        return $cliente->nome ?? $cliente->razao_social;
    }

    public function getCardDados()
    {
        $items = $this->newQuery()->get([
            'pedido_id', 'nome', 'razao_social', 'telefone', 'email'
        ]);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->pedido_id] = [
                'nome' => $item->nome ?? $item->razao_social,
                'telefone' => $item->telefone,
                'email' => $item->email
            ];
        }
        return $dados;
    }

    public function getNomes()
    {
        $dados = $this->newQuery()->get(['pedido_id', 'nome', 'razao_social']);

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->pedido_id] = $dado->nome ?? $dado->razao_social;
        }
        return $items;
    }

    public function getIdCliente($idPedido)
    {
        return $this->newQuery()
            ->where('pedido_id', $idPedido)->first('id')->id;
    }

    public function remover($id)
    {
        $id ?
        $this->newQuery()
            ->find($id)
            ->delete() : null;
    }
}
