<?php

namespace App\src\Pedidos\Arquivos;

use App\Models\PedidosArquivos;
use App\Services\Images;

class ArquivosPedido
{
    public function inserirAquivo($file, $path)
    {
        return (new Images())->armazenarSeparado($file, $path);
    }
}
