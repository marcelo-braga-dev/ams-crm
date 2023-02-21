<?php

namespace App\Services\Setores;

use App\Models\Setores;

class SetoresService
{
    public function setores()
    {
        $dados = [];
        $categorias = (new Setores())->get();

        foreach ($categorias as $item) {
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
