<?php

namespace App\Http\Controllers\Consultor\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetasController extends Controller
{
    public function index(Request $request)
    {
        $ano = $request->ano ?? date('Y');

        $vendasMensalUsuario = (new Pedidos())->vendasMensaisUsuario(id_usuario_atual(), $ano);
        $dados = (new MetasVendas())->getMeta(id_usuario_atual(), $ano);

        return Inertia::render('Consultor/Relatorios/Metas/Index',
            compact('vendasMensalUsuario', 'ano', 'dados'));
    }
}
