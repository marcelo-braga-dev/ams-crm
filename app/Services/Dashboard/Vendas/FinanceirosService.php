<?php

namespace App\Services\Dashboard\Vendas;

use App\Models\Pedidos;
use App\Models\PedidosHistoricos;
use App\src\Pedidos\Status\AcompanhamentoStatus;
use App\src\Pedidos\Status\AguardandoFaturamentoStatus;
use App\src\Pedidos\Status\EntregueStatus;
use App\src\Pedidos\Status\FaturadoStatus;
use DateTime;
use Illuminate\Support\Facades\DB;

class FinanceirosService
{
    public function faturamento()
    {
        $dados = [];
        $dados['total'] = 0;

        // filtros
        $query = (new Pedidos())->newQuery();

        $vendasMensais = $query->select(
            DB::raw('MONTH(status_data) as mes'),
            DB::raw('SUM(preco_venda) as vendas')
        )
            ->where('status', (new FaturadoStatus())->getStatus())
            ->orWhere('status', (new AcompanhamentoStatus())->getStatus())
            ->orWhere('status', (new EntregueStatus())->getStatus())
            ->groupBy(DB::raw('MONTH(status_data)'))
            ->get();

        foreach ($vendasMensais as $item) {
            $dados[$item['mes']] = $item['vendas'];
            $dados['total'] += $item['vendas'];

        }
        $dados['media'] = $dados['total'] / ((count($vendasMensais) > 0 ?: 1));

        return $dados;
    }

    public function prazos()
    {
        $pedidos = (new PedidosHistoricos())->newQuery()
            ->where('status', (new AguardandoFaturamentoStatus())->getStatus())
            ->orWhere('status', (new FaturadoStatus())->getStatus())
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
        $media = $total / count($soma);

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
