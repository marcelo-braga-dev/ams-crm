<?php

namespace App\Services\Pedidos\Relatorios;

use App\Models\PedidosFaturamentos;
use App\Models\ProdutosHistoricos;

class ProdutosService
{
    public function faturamento($mes, $fornecedor, $consultor)
    {
        return (new PedidosFaturamentos())->get($mes, $fornecedor, $consultor);
    }

    public function historicos($mes, $fornecedor, $consultor)
    {
        return (new ProdutosHistoricos())->get($mes, $fornecedor, $consultor);
    }
}
