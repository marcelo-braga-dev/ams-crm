<?php

namespace App\Http\Controllers\Admin\Pedidos\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\User;
use App\Services\Pedidos\Relatorios\ProdutosService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * @deprecated
 */
class FaturamentoController extends Controller
{
    public function index(Request $request)
    {
        $setorAtual = $request->setor;
        $setores = (new SetoresService())->setores();
        $consultores = (new User())->getUsuarios($setorAtual);

        return Inertia::render('Admin/Pedidos/Relatorio/Faturamento/Index',
        compact('consultores', 'setores', 'setorAtual'));
    }

    public function show($id, Request $request)
    {
        $fornecedor = $request->fornecedor;
        $mes = $request->mes ?? date('m');
        $idConsultor = $id;

        $fornecedores = (new Fornecedores())->getAll(null);
        $produtos = (new ProdutosService())->faturamento($mes, $fornecedor, $id);
        $consultor = (new User)->get($id);

        return Inertia::render('Admin/Pedidos/Relatorio/Faturamento/Show',
            compact('produtos', 'fornecedores', 'fornecedor', 'mes', 'consultor'));
    }
}
