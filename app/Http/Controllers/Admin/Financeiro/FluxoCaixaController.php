<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosEmpresas;
use App\Models\FinanceirosSalarios;
use App\Models\FluxoCaixa;
use App\Models\FluxoCaixasConfig;
use App\Models\Franquias;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FluxoCaixaController extends Controller
{
    public function index(Request $request)
    {
        $fornecedores = (new FluxoCaixasConfig())->getFornecedores();
        $empresas = (new FluxoCaixasConfig())->getEmpresas();
        $franquias = (new Franquias())->get();

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Index',
            compact('fornecedores', 'franquias', 'empresas'));
    }

    public function create()
    {
        $dados = [
            'empresas' => (new FinanceirosEmpresas())->get(),
            'fornecedores' => (new FluxoCaixasConfig())->getFornecedores(),
            'bancos' => (new FluxoCaixasConfig())->getBancos(),
            'franquias' => (new Franquias())->get(),
            'permissaoEntradas' => is_fluxocaixa_entradas(),
            'permissaoSaidas' => is_fluxocaixa_saidas()
        ];

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Create', compact('dados'));
    }

    public function store(Request $request)
    {
        (new FluxoCaixa())->create($request);

        modalSucesso('Operação realizada com sucesso!');
        return redirect()->route('admin.financeiro.fluxo-caixa.index');
    }

    public function show($id)
    {
        $dados = (new FluxoCaixa())->find($id);
        $bancos = (new FluxoCaixasConfig())->getBancos();

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Show',
            compact('dados', 'bancos'));
    }

    public function edit($id)
    {
        $flucoCaixa = (new FluxoCaixa())->find($id);

        $dados = [
            'empresas' => (new FluxoCaixasConfig())->getEmpresas(),
            'fornecedores' => (new FluxoCaixasConfig())->getFornecedores(),
            'bancos' => (new FluxoCaixasConfig())->getBancos(),
            'franquias' => (new Franquias())->get()
        ];

        return Inertia::render('Admin/Financeiro/FluxoCaixa/Edit',
            compact('flucoCaixa', 'dados'));
    }

    public function update($id, Request $request)
    {
        (new FluxoCaixa())->atualizar($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }

    public function alterarBaixa($id, Request $request)
    {
        (new FluxoCaixa())->atualizarBaixa($id, $request);

        modalSucesso('Dados atualizado com sucesso!');
    }

    public function alterarStatus(Request $request)
    {
        (new FluxoCaixa())->updateStatus($request->id, $request->status);

        modalSucesso("Status atualizado com sucesso!");
    }

    public function destroy($id)
    {
        (new FluxoCaixa())->excluir($id);

        modalSucesso('Pagamento excluído com sucesso!');
        return redirect()->route('admin.financeiro.fluxo-caixa.index');
    }

    public function registros(Request $request)
    {
        $dataInicio = $request->periodoInicio ?? now();
        $dataFim = $request->periodoFim ?? now();
        $tipo = $request->tipo;
        $status = $request->status;
        $fornecedor = $request->fornecedor;
        $franquia = $request->franquia;
        $empresa = $request->empresa;

        $dados = (new FluxoCaixa())->getValores($dataInicio, $dataFim, $tipo, $status, $fornecedor, $franquia, $empresa);
        $salarios = (new FinanceirosSalarios())->financeiro($dataInicio, $dataFim);

        return response()->json(['registros' => $dados, 'salarios' => $salarios]);
    }
}
