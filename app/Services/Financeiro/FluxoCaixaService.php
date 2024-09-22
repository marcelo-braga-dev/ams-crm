<?php

namespace App\Services\Financeiro;

use App\Models\Financeiro\FluxoCaixa;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;


class FluxoCaixaService
{
    public function getRegistrosFiltrados($filters)
    {
        $dataInicio = Carbon::parse($filters->get('periodoInicio') ?? now())->format('d/m/Y');
        $dataFim = Carbon::parse($filters->get('periodoFim') ?? now())->format('d/m/Y');
        $tipo = $filters->get('tipo');
        $status = $filters->get('status');
        $fornecedor = $filters->get('fornecedor');
        $franquia = $filters->get('franquia');
        $empresa = $filters->get('empresa');

        $query =  (new FluxoCaixa)->getAll();

        $this->filtroTipo($query, $tipo);
        $this->filtroStatus($query, $status);
        $this->filtroFornecedor($query, $fornecedor);
        $this->filtroFranquia($query, $franquia);
        $this->filtroEmpresa($query, $empresa);
        $this->filtroPeriodo($query, $dataInicio, $dataFim);

        return $query->get();
    }

    private function filtroTipo($query, $tipo)
    {
        $query->when($tipo, fn($q, $tipo) => $q->where('tipo', $tipo));
    }

    private function filtroStatus($query, $status)
    {
        $query->whereHas('pagamentos', function ($query) use ($status) {
            $query->when($status === 'pago', function ($q) {
                $q->whereNotNull('data_baixa');
            })
                ->when($status === 'aberto', function ($q) {
                    $q->whereNull('data_baixa');
                });
        });
    }

    private function filtroFornecedor($query, $fornecedor)
    {
        $query->whereHas('fornecedor', function ($q) use ($fornecedor) {
            $q->when($fornecedor, function ($q, $valor) {
                $q->where('fornecedor_id', $valor);
            });
        });
    }

    private function filtroFranquia($query, $franquia)
    {
        $query->whereHas('franquia', function ($q) use ($franquia) {
            $q->when($franquia, function ($q, $valor) {
                $q->where('franquia_id', $valor);
            });
        });
    }

    private function filtroEmpresa($query, $empresa)
    {
        $query->where(function ($query) use ($empresa) {
            $query->whereHas('empresa', function ($q) use ($empresa) {
                $q->when($empresa, function ($q, $valor) {
                    $q->where('empresa_id', $valor);
                });
            });

            if (empty($empresa)) {
                $query->orWhereDoesntHave('empresa');
            }
        });
    }

    private function filtroPeriodo($query, $dataInicio, $dataFim)
    {
        $query->whereHas('pagamentos', function ($query) use ($dataInicio, $dataFim) {
            $query->whereBetween(DB::raw('DATE_FORMAT(data, "%d/%m/%Y")'), [$dataInicio, $dataFim]);
        });
    }
}
