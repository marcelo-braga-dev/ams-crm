<?php

namespace App\Services\Categorias;

use App\Models\Setores;

class CategoriasService
{
    public function categorias()
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
