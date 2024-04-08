<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\PedidosFaturamentos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use Illuminate\Support\Facades\DB;

class VendasService
{
    public function metaVendas($mes, $ano)
    {
        $nomes = (new User())->getNomes();
        $usuarios = (new User())->getUsuarios();

        $vendasUsuarios = [];
        foreach ($usuarios as $usuario) {
            $vendasUsuarios[] = [
                'id' => $usuario['id'],
                'nome' => $nomes[$usuario['id']] ?? '',
                'vendas' => (new Pedidos())->getVendasMesUsuario($usuario['id'], $mes, $ano),
                'meta' => (new MetasVendas())->getMetaMes($usuario['id'], $mes, $ano)
            ];
        }
        return $vendasUsuarios;
    }
}
