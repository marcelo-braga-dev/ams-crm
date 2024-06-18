<?php

namespace App\Services\Fornecedores;

use App\Models\Fornecedores;
use App\Models\ProdutosFornecedores;
use App\Models\Setores;

class FornecedoresService
{
    private array $setores;

    public function __construct()
    {
        $this->setores = (new Setores())->getNomes();
    }

    public function fornecedores(?int $setor = null)
    {
        return (new ProdutosFornecedores())->fornecedores($setor);
    }

    private function dados($item)
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'cnpj' => $item->cnpj,
            'setor' => $this->setores[$item->setor]['nome']
        ];
    }
}
