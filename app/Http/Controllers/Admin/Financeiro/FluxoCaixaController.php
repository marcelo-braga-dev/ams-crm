<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\DTO\FluxoCaixa\FluxoCaixaDTO;
use App\DTO\FluxoCaixa\FluxoCaixaRealizarPagamentoDTO;
use App\Http\Controllers\Controller;
use App\Models\FinanceirosEmpresas;
use App\Models\FluxoCaixa;
use App\Models\FluxoCaixasConfig;
use App\Models\Franquias;
use App\Repositories\FluxoCaixa\FluxoCaixaRepositories;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FluxoCaixaController extends Controller
{
    protected $fluxoCaixaRepository;

    public function __construct()
    {
        $this->fluxoCaixaRepository = new FluxoCaixaRepositories;
    }

    public function index(Request $request)
    {
        return Inertia::render('Admin/Financeiro/FluxoCaixa/Index/Index');
    }

    public function store(Request $request)
    {
        try {
            $fluxoCaixaDTO = FluxoCaixaDTO::fromArray($request);
            $this->fluxoCaixaRepository->create($fluxoCaixaDTO);

            modalSucesso('Operação realizada com sucesso!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            modalErro('Falha no cadastro da nota!');
        }
    }

    public function update($id, Request $request)
    {
        (new FluxoCaixa())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function destroy($id)
    {
        $this->fluxoCaixaRepository->delete($id);

        modalSucesso('Pagamento excluído com sucesso!');
        return redirect()->route('admin.financeiro.fluxo-caixa.index');
    }

    public function getProximosPagamentos(Request $request)
    {
        $entrada = $request->input('tipo_entrada');
        $saida = $request->input('tipo_saida');

        $pagamentos = $this->fluxoCaixaRepository->getProximosPagamentos($entrada, $saida);

        return response()->json(compact('pagamentos'));
    }

    public function setRealizarPagamento(Request $request)
    {
        $pagamentoPDO = FluxoCaixaRealizarPagamentoDTO::fromArray($request);
        $this->fluxoCaixaRepository->setPagamento($request->pagamento_id, $pagamentoPDO);

        modalSucesso('Pagamento realizado com sucesso!');
    }

    public function getRegistrosFiltrados(Request $request)
    {
        $registros = $this->fluxoCaixaRepository->getRegistrosFiltrados($request);

        return response()->json($registros);
    }

    public function getVariaveis()
    {
        $formasPagamento = [
            'Cartão de Crédito',
            'PIX',
            'Boleto',
            'Cheque'
        ];

        $dados = [
            'empresas' => (new FinanceirosEmpresas())->get(),
            'fornecedores' => (new FluxoCaixasConfig())->getFornecedores(),
            'bancos' => (new FluxoCaixasConfig())->getBancos(),
            'franquias' => (new Franquias())->get(),
            'formas_pagamento' => $formasPagamento,
            'permissoes' => [
                'entrada' => is_fluxocaixa_entradas(),
                'saida' => is_fluxocaixa_saidas(),
            ],
        ];

        return response()->json($dados);
    }
}
