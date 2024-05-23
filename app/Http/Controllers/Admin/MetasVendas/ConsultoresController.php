<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultoresController extends Controller
{
    public function index()
    {
        $usuarios = (new User())->getUsuarios();

        return Inertia::render('Admin/MetasVendas/Consultores/Index',
            compact('usuarios'));
    }

    public function edit($id, Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $usuario = (new User())->get($id);
        $meta = (new MetasVendas())->getMetaMes($id, $mes, $ano);

        $vendasMensais = (new Pedidos())->vendasMensaisUsuario($id, $ano);
        $metasMensais = (new MetasVendas())->metasMensais($id, $ano);

        return Inertia::render('Admin/MetasVendas/Consultores/Edit',
            compact('usuario', 'mes', 'ano', 'meta', 'vendasMensais', 'metasMensais'));
    }

    public function update($id, Request $request)
    {
        (new MetasVendas())->createOrUpdate($id, $request);

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->back();
    }
}
