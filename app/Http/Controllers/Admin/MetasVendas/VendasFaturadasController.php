<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Models\User;
use App\Services\Excel\VendasUsuario;
use App\Services\Pedidos\PlanilhaProdutos;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Models\Pedidos;
use Illuminate\Http\Request;
use App\Models\PedidosFaturamentos;
use App\Http\Controllers\Controller;

class VendasFaturadasController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $mes = is_array($mes) ? $mes : [$mes];

        $usuario = $request->id ? (new User())->get($request->id) : '';
        $vendas = $request->id ? (new PedidosFaturamentos())->faturadosPeriodo($request->id, $mes, $ano) : [];

        $usuarios = (new User())->getUsuarios();

        return Inertia::render('Admin/MetasVendas/VedasFaturadas/Index',
            compact('vendas', 'usuario', 'usuarios', 'mes', 'ano'));
    }

    public function planilha(Request $request)
    {
        $file = (new VendasUsuario())->gerar($request->usuario, $request->vendas);

        return response()->json($file);
    }
}
