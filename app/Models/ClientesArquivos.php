<?php

namespace App\Models;

use App\Services\Images;
use App\src\Pedidos\Arquivos\ChavesArquivosPedidos;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;

class ClientesArquivos extends Model
{
    use HasFactory;

    protected $fillable = [
        'clientes_id',
        'chave',
        'valor'
    ];

    public function create($id, $dados)
    {
        $urlRg = (new Images())->armazenar($dados, 'file_rg', 'clientes/' . $id);
        $urlCpf = (new Images())->armazenar($dados, 'file_cpf', 'clientes/' . $id);
        $urlCnh = (new Images())->armazenar($dados, 'file_cnh', 'clientes/' . $id);
        $urlCnpj = (new Images())->armazenar($dados, 'file_cartao_cnpj', 'clientes/' . $id);

        $chave = (new ChavesArquivosPedidos());
        $query = $this->newQuery();
        try {
            if ($urlRg) $query->create([
                    'clientes_id' => $id,
                    'chave' => $chave->rg(),
                    'valor' => $urlRg
                ]);
            if ($urlCpf) $query->create([
                'clientes_id' => $id,
                'chave' => $chave->cpf(),
                'valor' => $urlCpf
            ]);
            if ($urlCnh) $query->create([
                'clientes_id' => $id,
                'chave' => $chave->cnh(),
                'valor' => $urlCnh
            ]);
            if ($urlCnpj) $query->create([
                'clientes_id' => $id,
                'chave' => $chave->cnpj(),
                'valor' => $urlCnpj
            ]);
        } catch (QueryException $exception) {
            print_pre($exception->getMessage());
            throw new \DomainException('Falha no cadastro dos anexos do cliente.');
        }
    }

    public function get($id)
    {
        $dados = $this->newQuery()
            ->where('clientes_id', $id)
            ->get();

        $items = [];
        foreach ($dados as $item) {
            $items[$item->chave] = $item->valor;
        }
        return $items;
    }
}
