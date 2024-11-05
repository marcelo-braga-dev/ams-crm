<?php

namespace App\Http\Controllers\Admin\Pedidos\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\ProdutosFornecedores;
use App\Models\User;
use App\Services\Excel\ExportarExcelService;
use App\Services\Pedidos\Relatorios\ProdutosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * @deprecated
 */
class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        $fornecedor = $request->fornecedor;
        $consultor = $request->consultor;
        $mes = $request->mes ?? date('m');

        $historicos = (new ProdutosService())->historicos($mes, $fornecedor, $consultor);
        $urlPlanilha = (new ExportarExcelService())->faturamento($historicos);
//        $historicos = (new ProdutosRelatoriosService())->relatorio($mes, $consultor, $fornecedor);

        $fornecedores = (new ProdutosFornecedores())->getAll(null);
        $consultores = (new User())->getUsuarios();

        return Inertia::render('Admin/Pedidos/Relatorio/Produtos/Index',
            compact('historicos', 'fornecedores', 'fornecedor',
                'mes', 'consultores', 'consultor', 'urlPlanilha'));
    }

    public function gerarPlanilha(Request $request)
    {
        $fornecedor = $request->fornecedor;
        $consultor = $request->consultor;
        $mes = $request->mes ?? date('m');

        $historicos = (new ProdutosService())->historicos($mes, $fornecedor, $consultor);

        $url = (new ExportarExcelService())->faturamento($historicos);

        dd($historicos);
    }
}
