<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetaEmpresaController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $dados = (new MetasVendas())->getMetaEmpresa($mes, $ano);
        $vendasMensalUsuario = (new Pedidos())->vendasMensaisUsuario(1, $ano);

        return Inertia::render('Admin/MetasVendas/Empresa/Index',
            compact( 'dados', 'mes', 'ano', 'vendasMensalUsuario'));
    }

    public function update($id, Request $request)
    {
        print_pre($request->all());
    }
}
