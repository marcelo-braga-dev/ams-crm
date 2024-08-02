<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\Services\Pedidos\StatusPedidosServices;
use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use DateTime;
use Illuminate\Support\Facades\DB;

class FinanceirosService
{
    public function faturamento($ano)
    {
        $dados = [];
        $dados['total'] = 0;

        // filtros
        $query = (new Pedidos())->newQuery();

        $vendasMensais = $query->select(
            DB::raw('MONTH(status_data) as mes'),
            DB::raw('SUM(preco_venda) as vendas')
        )
            ->whereIn('status', (new StatusPedidosServices())->statusAguardandoFaturamendo())
            ->whereYear('created_at', $ano)
            ->groupBy(DB::raw('MONTH(status_data)'))
            ->get();

        foreach ($vendasMensais as $item) {
            $dados[$item['mes']] = $item['vendas'];
            $dados['total'] += $item['vendas'];

        }
        $qtd = (count($dados) - 1);
        $dados['media'] = $dados['total'] / ($qtd > 0 ? $qtd : 1);

        return $dados;
    }

    public function prazos($ano)
    {
        $pedidos = (new PedidosHistoricos())->newQuery()
            ->where('status', (new AguardandoFaturamentoStatus())->getStatus())
            ->orWhere('status', (new FaturadoStatus())->getStatus())
            ->whereYear('created_at', $ano)
            ->get();

        $datas = [];
        foreach ($pedidos as $item) {
            $datas[$item->pedidos_id][$item->status] = $item->created_at;
        }

        $diferencaMeses = [];
        foreach ($datas as $data) {
            if (($data['faturado'] ?? null))
                $diferencaMeses[date('m', strtotime($data['aguardando_faturamento']))][] =
                    $this->getDiferenca($data['aguardando_faturamento'], $data['faturado']);
        }

        $soma = [];
        foreach ($diferencaMeses as $index => $item) {
            $soma[intval($index)] = array_sum($item) / count($item);
        }

        // Media
        $total = 0;
        foreach ($soma as $item) {
            $total += $item;
        }
        $media = $total / (count($soma) > 0 ?: 1);

        return [
            'meses' => $soma,
            'media' => $media
        ];
    }

    private function getDiferenca($faturando, $faturado)
    {
        $saida = new DateTime($faturando);

        $entrada = new DateTime($faturado);

        return $saida->diff($entrada)->days;
    }
}
