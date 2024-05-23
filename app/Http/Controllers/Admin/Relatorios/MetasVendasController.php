<?php

namespace App\Http\Controllers\Admin\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetasVendasController extends Controller
{
    public function index(Request $request)
    {
        $ano = $request->ano ?? date('Y');

        $vendasMensalUsuario = (new Pedidos())->_vendasMensaisUsuario(id_usuario_atual(), $ano);
        $dados = (new MetasVendas())->getMeta(id_usuario_atual(), $ano);
        $vendasMensalSubordinados = (new Pedidos())->vendasMensaisSubordinados(id_usuario_atual(), $ano);

        return Inertia::render('Admin/Relatorios/MetasVendas/Index',
            compact('vendasMensalUsuario', 'ano', 'dados', 'vendasMensalSubordinados'));
    }
}
