<?php

namespace App\src\Orcamentos;

use App\Models\ProdutosKitsSolar;

class BuscarKits
{
    public function getKits($dados)
    {
        $potencia = (new CalcularPotencia())->calcular($dados);
        $kits = (new ProdutosKitsSolar())->getKits($potencia, $dados);

        return ['kits' => $kits, 'potencia' => $potencia];
    }
}
