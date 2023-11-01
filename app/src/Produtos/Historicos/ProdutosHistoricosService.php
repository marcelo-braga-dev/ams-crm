<?php

namespace App\src\Produtos\Historicos;

use App\Models\ProdutosHistoricos;

class ProdutosHistoricosService
{
    public function create(int $id, $status, $valor)
    {
        (new ProdutosHistoricos())->create($id, $status, $valor);
    }
}
