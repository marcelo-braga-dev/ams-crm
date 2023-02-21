<?php

namespace App\Services\Fornecedores;

use App\Models\Fornecedores;
use App\Models\Setores;

class FornecedoresService
{
    private array $setores;

    public function __construct()
    {
        $this->setores = (new Setores())->nomes();
    }

    public function fornecedores(?int $setor = null)
    {
        $dados = [];
        $items = (new Fornecedores())->getAll($setor);

        foreach ($items as $item) {
            $dados[] = $this->dados($item);
        }
        return $dados;
    }

    private function dados($item)
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome,
            'setor' => $this->setores[$item->setor]['nome']
        ];
    }
}
