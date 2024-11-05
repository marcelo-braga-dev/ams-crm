<?php

namespace App\Repositories\FluxoCaixa;

use App\DTO\FluxoCaixa\FluxoCaixaDTO;
use App\DTO\FluxoCaixa\FluxoCaixaPagamentoDTO;
use App\DTO\FluxoCaixa\FluxoCaixaRealizarPagamentoDTO;
use App\Models\Financeiro\FluxoCaixa;
use App\Models\Financeiro\FluxoCaixaPagamento;
use App\Services\Financeiro\FluxoCaixaService;
use Illuminate\Support\Facades\DB;

class FluxoCaixaRepositories
{
    protected FluxoCaixa $model;

    public function __construct()
    {
        $this->model = new FluxoCaixa;
    }

    public function create(FluxoCaixaDTO $fluxoCaixaDTO): void
    {
        DB::transaction(function () use ($fluxoCaixaDTO) {

            $notaFiscalData = $fluxoCaixaDTO->toArray();
            $pagamentosData = $notaFiscalData['pagamentos'];

            unset($notaFiscalData['pagamentos']);

            // Cria o Fluxo de Caixa
            $notaFiscal = $this->model->create($notaFiscalData);

            // Cria os Pagamentos relacionados
            foreach ($pagamentosData as $pagamentoData) {
                $notaFiscal->pagamentos()->create($pagamentoData);
            }

            return $notaFiscal->load('pagamentos');
        });
    }

    public function delete($id)
    {
        $fluxoCaixa = FluxoCaixa::with('pagamentos')->find($id);

        if ($fluxoCaixa) {
            $fluxoCaixa->pagamentos()->delete();

            $fluxoCaixa->delete();
        }
    }

    public function setPagamento(int $id, FluxoCaixaRealizarPagamentoDTO $pagamentoDTO)
    {
        DB::transaction(function () use ($id, $pagamentoDTO) {

            $pagamentoData = $pagamentoDTO->toArray();

            FluxoCaixaPagamento::find($id)
                ->update($pagamentoData);
        });
    }

    public function getProximosPagamentos($filtrarEntrada, $filtrarSaida)
    {
        return (new FluxoCaixaPagamento())
            ->getNotaFiscal()
            ->whereNull('data_baixa')
            ->whereHas('notaFiscal', function ($q) use ($filtrarEntrada, $filtrarSaida) {
                $q->when($filtrarEntrada, function ($q) {
                    $q->where('tipo', 'entrada');
                })
                    ->when($filtrarSaida, function ($q) {
                        $q->where('tipo', 'saida');
                    });
            })
            ->orderBy('data')
            ->get();
    }

    public function getRegistrosFiltrados($request)
    {
        return (new FluxoCaixaService())->getRegistrosFiltrados($request);
    }
}
