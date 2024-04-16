<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\PedidosFaturamentos;
use App\Models\PedidosHistoricos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\Status\CanceladoStatus;
use App\src\Pedidos\Status\RevisarStatusPedido;
use Illuminate\Support\Facades\DB;

class VendasService
{
    public function metaVendas($mes, $ano, $setor): array
    {
        $usuarios = (new User())->getUsuarios($setor, false);
        $isAdmin = is_admin();

        $vendasUsuarios = [];
        $totalVendas = 0;
        $totalMetas = 0;
        $totalCustos = 0;
        $totalQtd = 0;

        foreach ($usuarios as $usuario) {

            $vendas = (new Pedidos())->getVendasMesUsuario($usuario['id'], $mes, $ano);
            $metas = (new MetasVendas())->getMetaMes($usuario['id'], $mes, $ano);

            if ($usuario['status'] == 'ativo') $totalMetas += $metas;

            if ($usuario['status'] == 'ativo' || $vendas->qtd > 0) {

                $totalVendas += $vendas->vendas;
                $totalCustos += $vendas->custos;
                $totalQtd += $vendas->qtd;

                $vendasUsuarios[] = [
                    'vendas' => $vendas->vendas,
                    'custos' => $isAdmin ? $vendas->custos : null,
                    'lucro' => $isAdmin ? ($vendas->vendas - $vendas->custos) : null,
                    'qtd' => $vendas->qtd,
                    'id' => $usuario['id'],
                    'nome' => $usuario['nome'],
                    'meta' => $metas
                ];
            }
        }
        rsort($vendasUsuarios);

        return ['vendas' => $vendasUsuarios, 'totalVendas' => $totalVendas, 'totalMetas' => $totalMetas, 'totalCustos' => $isAdmin ? $totalCustos : null,
            'totalQtd' => $totalQtd];
    }

    public function metaVendasAnual($ano, $setor): array
    {
        $meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        $nomeMes = [1 => 'jan', 2 => 'fev', 3 => 'mar', 4 => 'abr', 5 => 'mai', 6 => 'jun', 7 => 'jul', 8 => 'ago', 9 => 'set', 10 => 'out', 11 => 'nov', 12 => 'dez'];

        $somaVendas = 0;
        $somaMetas = 0;

        $dados = [];
        foreach ($meses as $mes) {
            $item = $this->metaVendas($mes, $ano, $setor);
            $somaVendas += $item['totalVendas'];
            $somaMetas += $item['totalMetas'];
            $dados[] = ['mes' => $nomeMes[$mes], 'total_vendas' => $item['totalVendas'], 'total_metas' => $item['totalMetas']];
        }

        $dados[] = ['mes' => "total", 'total_vendas' => $somaVendas, 'total_metas' => $somaMetas];
           
        return $dados;
    }
}
