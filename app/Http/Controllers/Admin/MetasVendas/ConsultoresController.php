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
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $usuarios = (new User())->usuariosComMetasVendas();

        $usuario = $request->id ? (new User())->get($request->id) : [];
        $meta = (new MetasVendas())->getMetaMes($request->id, $mes, $ano);

        $vendasMensais = (new Pedidos())->vendasMensaisUsuario($request->id, $ano);
        $metasMensais = (new MetasVendas())->metasMensais($request->id, $ano);

        return Inertia::render('Admin/MetasVendas/Consultores/Index',
            compact('usuario', 'mes', 'ano', 'meta', 'usuarios', 'vendasMensais', 'metasMensais'));
    }

    public function update($id, Request $request)
    {
        (new MetasVendas())->createOrUpdate($id, $request);

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->back();
    }
}
