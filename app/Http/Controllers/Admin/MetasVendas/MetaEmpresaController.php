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

        $meta = (new MetasVendas())->getMetaEmpresa($mes, $ano);
        $vendasMensais = (new Pedidos())->vendasMensaisEmpresa($ano);

        $metasMensais = (new MetasVendas())->metasMensaisEmpresa($ano);
//        print_pre($vendasMensais);

        return Inertia::render('Admin/MetasVendas/Empresa/Index',
            compact('meta', 'mes', 'ano', 'metasMensais', 'vendasMensais'));
    }

    public function update($id, Request $request)
    {
        (new MetasVendas())->updateMetaEmpresa($request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }
}
