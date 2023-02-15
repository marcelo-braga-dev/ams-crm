<?php

namespace App\Services\Notificacoes;

use App\Models\Fornecedores;

class FornecedoresService
{
    public function fornecedores()
    {
        $dados = [];
        $items = (new Fornecedores())->getAll();

        foreach ($items as $item) {
            $dados[] = $this->dados($item);
        }
        return $dados;
    }

    private function dados($item)
    {
        return [
            'id' => $item->id,
            'nome' => $item->nome
        ];
    }
}
