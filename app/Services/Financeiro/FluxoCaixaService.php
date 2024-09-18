<?php

namespace App\Services\Financeiro;

use App\Models\Financeiro\FluxoCaixa;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class FluxoCaixaService
{
    public function getRegistrosFiltrados($filters)
    {
        $dataInicio =  Carbon::parse($filters->get('periodoInicio') ?? now())->format('d/m/Y');
        $dataFim =  Carbon::parse($filters->get('periodoFim') ?? now())->format('d/m/Y') ;

        return (new FluxoCaixa)->getRegistros()

            ->when($filters->input('tipo'), fn($q, $tipo) => $q->where('tipo', $tipo))
            ->when($filters->input('status'), fn($q, $status) => $q->where('status', $status))
            ->when($filters->input('fornecedor'), fn($q, $fornecedor) => $q->where('fornecedor_id', $fornecedor))
            ->when($filters->input('franquia'), fn($q, $franquia) => $q->where('franquia_id', $franquia))
            ->when($filters->input('empresa'), fn($q, $empresa) => $q->where('empresa_id', $empresa))
            ->whereHas('pagamentos', function ($query) use ($dataInicio, $dataFim) {
                $query->whereBetween(DB::raw('DATE_FORMAT(data, "%d/%m/%Y")'), [$dataInicio, $dataFim]);
            })
            ->get();
    }
}
