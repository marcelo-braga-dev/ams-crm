<?php

namespace App\Services\Fornecedores;

use App\Models\Fornecedores;
use App\Models\Setores;

class FornecedoresService
{
    private $nomeSetores;

    public function __construct()
    {
        $this->nomeSetores = (new Setores())->nomes();
    }

    public function todos()
    {
        $dados = (new Fornecedores())->getAll();

        $items = [];
        foreach ($dados as $dado) {
            $items[] = $this->dados($dado);
        }
        return $items;
    }

    public function dados($dado)
    {
        return [
            'id' => $dado->id,
            'nome' => $dado->nome,
            'setor' => $this->nomeSetores[$dado->setor]['nome'],
            'cnpj' => $dado->cnpj,
        ];
    }
}
