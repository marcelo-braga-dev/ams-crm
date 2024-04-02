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
        $ano = $request->ano ?? date('Y');

        $usuario = (new User())->get($id);

        $dados = (new MetasVendas())->getMeta($id, $ano);
        $vendasMensalUsuario = (new Pedidos())->vendasMensaisUsuario($id, $ano);
        $vendasMensalSubordinados = (new Pedidos())->vendasMensaisSubordinados($id, $ano);

        return Inertia::render('Admin/MetasVendas/Consultores/Edit',
            compact('usuario', 'dados', 'ano', 'vendasMensalUsuario', 'vendasMensalSubordinados'));
    }

    public function update($id, Request $request)
    {
        $ano = $request->ano ?? date('Y');
        (new MetasVendas())->createOrUpdate($id, $request->except('_method'), $ano);

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->back();
    }
}
