<?php

namespace App\Http\Controllers\Admin\Pedidos\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\Fornecedores;
use App\Models\User;
use App\Services\Pedidos\Relatorios\ProdutosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdutosController extends Controller
{
    public function index(Request $request)
    {
        $fornecedor = $request->fornecedor;
        $mes = $request->mes ?? date('m');
        $consultor = $request->consultor;

        $produtos = (new ProdutosService())->historicos($mes, $fornecedor, $consultor);
        $fornecedores = (new Fornecedores())->getAll(null);
        $consultores = (new User())->getConsultores();

        return Inertia::render('Admin/Pedidos/Relatorio/Produtos/Index',
            compact('produtos', 'fornecedores', 'fornecedor', 'mes', 'consultores', 'consultor'));
    }
}
