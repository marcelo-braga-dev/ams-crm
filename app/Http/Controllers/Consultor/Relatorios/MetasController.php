<?php

namespace App\Http\Controllers\Consultor\Relatorios;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\PedidosFaturamentos;
use App\Models\User;
use App\Services\Dashboard\Vendas\VendasService;
use App\Services\Excel\VendasUsuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetasController extends Controller
{
    public function index(Request $request)
    {
        $ano = $request->ano ?? date('Y');
        $mes = $request->ano ?? date('m');
        $idUsuario = id_usuario_atual();

        $vendas = (new Pedidos())->vendasMensaisUsuario($idUsuario, $ano);
        $metas = (new MetasVendas())->metasMensais($idUsuario, $ano);

        $vendasDistribuidoras = (new VendasService())->vendasFornecedoresPorUsuario([$mes], $ano, id_usuario_atual(), setor_usuario_atual());

        return Inertia::render(
            'Consultor/Relatorios/Metas/Index',
            compact('idUsuario', 'vendas', 'vendasDistribuidoras', 'metas', 'ano')
        );
    }

    public function show($id, Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $mes = is_array($mes) ? $mes : [$mes];

        $usuario = (new User())->get(id_usuario_atual());
        $vendas = (new PedidosFaturamentos())->faturadosPeriodo(id_usuario_atual(), $mes, $ano);

        return Inertia::render('Consultor/Relatorios/Metas/Show',
            compact('vendas', 'usuario', 'mes', 'ano'));
    }

    public function planilha(Request $request)
    {
        $file = (new VendasUsuario())->gerar($request->usuario, $request->vendas);

        return response()->json($file);
    }
}
