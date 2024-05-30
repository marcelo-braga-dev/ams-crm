<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetaEmpresaController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $setor = $request->setor ?? 1;

        $setores = (new Setores())->get();
        $meta = (new MetasVendas())->getMetaEmpresa($mes, $ano, $setor);
        $vendasMensais = (new Pedidos())->vendasMensaisEmpresa($ano, $setor);

        $metasMensais = (new MetasVendas())->metasMensaisEmpresa($ano, $setor);

        return Inertia::render('Admin/MetasVendas/Empresa/Index',
            compact('meta', 'mes', 'ano', 'metasMensais', 'vendasMensais', 'setor', 'setores'));
    }

    public function update($id, Request $request)
    {
        (new MetasVendas())->updateMetaEmpresa($request);

        modalSucesso('Dados atualizado com sucesso!');
        return redirect()->back();
    }
}
