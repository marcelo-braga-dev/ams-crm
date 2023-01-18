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
        'pedidos_id',
        'nome',
        'razao_social',
        'endereco',
        'telefone',
        'email',
        'cpf',
        'rg',
        'cnpj',
        'inscricao_estadual',
        'data_nascimento',
    ];

    public function create($id, $dados)
    {
        $idEndereco = (new Enderecos())->create($dados->get('endereco'));

        try {
            $this->newQuery()
                ->create([
                    'pedidos_id' => $id,
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
        } catch (QueryException $exception) {
            throw new \DomainException('Falha no cadastro do cliente.');
        }
    }

    public function getCliente(int $id)
    {
        return $this->newQuery()
            ->where('pedidos_id', $id)->first();
    }

    public function dados(): array
    {
        $items = $this->newQuery()->get();

        $dados = [];
        foreach ($items as $cliente) {
            $dados[$cliente->pedidos_id]['nome'] = $cliente->nome ?? $cliente->razao_social;
            $dados[$cliente->pedidos_id]['telefone'] = $cliente->telefone;
            $dados[$cliente->pedidos_id]['email'] = $cliente->email;
            $dados[$cliente->pedidos_id]['endereco'] = getEnderecoCompleto($cliente->endereco);
            $dados[$cliente->pedidos_id]['nascimento'] = date('d/m/Y', strtotime($cliente->data_nascimento));
        }

        return $dados;
    }

    public function updateDados(int $id, $dados)
    {
        (new Enderecos())->updateDados($id, $dados->get('endereco'));

        $this->newQuery()
            ->where('pedidos_id', $id)
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
        $cliente = $this->newQuery()->where('pedidos_id', $id)->first();
        if ($cliente === null) return 'Não Encontrado';
        return $cliente->nome ?? $cliente->razao_social;
    }

    public function getCardDados()
    {
        $items = $this->newQuery()->get([
            'pedidos_id', 'nome', 'razao_social', 'telefone', 'email'
        ]);

        $dados = [];
        foreach ($items as $item) {
            $dados[$item->pedidos_id] = [
                'nome' => $item->nome ?? $item->razao_social,
                'telefone' => $item->telefone,
                'email' => $item->email
            ];
        }
        return $dados;
    }

    public function getNomes()
    {
        $dados = $this->newQuery()->get(['pedidos_id', 'nome', 'razao_social']);

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->pedidos_id] = $dado->nome ?? $dado->razao_social;
        }
        return $items;
    }

    public function getIdCliente($idPedido)
    {
        return $this->newQuery()
            ->where('pedidos_id', $idPedido)->first('id')->id;
    }
}
