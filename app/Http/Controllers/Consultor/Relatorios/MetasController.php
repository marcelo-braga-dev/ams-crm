<?php

namespace App\Http\Controllers\Consultor\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\PedidosFaturamentos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetasController extends Controller
{
    public function index(Request $request)
    {
        $ano = $request->ano ?? date('Y');
        $idUsuario = id_usuario_atual();

        $vendasMensalUsuario = (new Pedidos())->vendasMensaisUsuario($idUsuario, $ano);
        $dados = (new MetasVendas())->getMeta($idUsuario, $ano);

        return Inertia::render(
            'Consultor/Relatorios/Metas/Index',
            compact('idUsuario', 'vendasMensalUsuario', 'ano', 'dados')
        );
    }

    public function show($id, Request $request)
    {

        $periodo = $request->mes . '/' . $request->ano;
        $usuario = (new User())->get($id);
        $vendas = (new PedidosFaturamentos())->faturadosPeriodo($id, $request->mes, $request->ano);

        return Inertia::render('Consultor/Relatorios/Metas/Show', compact('vendas', 'usuario', 'periodo'));
    }
}
