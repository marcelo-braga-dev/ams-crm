<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosEmpresas;
use App\Models\PedidosFaturados;
use App\Models\PedidosFaturadosPlanilhas;
use App\Models\PedidosFaturamentos;
use App\Models\ProdutosFornecedores;
use App\Models\Setores;
use App\Models\User;
use App\Services\Excel\FinanceiroFaturamento;
use App\Services\Excel\VendasUsuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturamentoController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $mes = is_array($mes) ? $mes : [$mes];
        $setor = $request->setor;
        $distribuidora = $request->distribuidora;
        $isFaturado = $request->faturados;

        $setores = (new Setores)->get();
        $empresas = (new FinanceirosEmpresas())->get();

        $vendas = (new PedidosFaturamentos())->faturadosPeriodo($request->id, $mes, $ano, $setor, $distribuidora, $isFaturado, true);
        $planilhasGeradas = (new PedidosFaturadosPlanilhas())->planilhas();

        $distribuidoras = (new ProdutosFornecedores())->get();

        return Inertia::render('Admin/Financeiro/Faturamento/Index',
            compact('vendas', 'setores', 'empresas', 'distribuidoras', 'distribuidora',
                'setor', 'planilhasGeradas', 'mes', 'ano', 'isFaturado'));
    }

    public function removerNotaDistribuidora(Request $request)
    {
        (new PedidosFaturados())->remover($request->id);

        modalSucesso('Nota Distribuidora removida com sucesso');
        return redirect()->back();
    }

    public function planilha(Request $request)
    {
        $path = (new FinanceiroFaturamento())->gerar($request->vendas, $request->pedidos);

        (new PedidosFaturadosPlanilhas())->create($path, $request->nota, $request->empresa, $request->distribuidora, $request->anotacoes);
        (new PedidosFaturados())->updateNotaDistribuidora($request->vendas, $request->pedidos, $request->nota, $request->empresa);

        modalSucesso('Planilha gerada com sucesso!');
    }

    public function atualizarAnotacao(Request $request)
    {
        (new PedidosFaturadosPlanilhas())->atualizarAnotacao($request->id, $request->anotacao);

        modalSucesso('Anotacao atualizada com sucesso!');
        return redirect()->back();
    }
}
