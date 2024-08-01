<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\PedidosFaturadosPlanilhas;
use App\Models\PedidosFaturamentos;
use App\Models\User;
use App\Services\Excel\FinanceiroFaturamento;
use App\Services\Excel\VendasUsuario;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaturamentoController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');
        $mes = is_array($mes) ? $mes : [$mes];

        $usuario = $request->id ? (new User())->get($request->id) : '';
        $vendas = (new PedidosFaturamentos())->faturadosPeriodo($request->id, $mes, $ano);
        $planilhasGeradas = (new PedidosFaturadosPlanilhas())->planilhas();

        $usuarios = (new User())->getUsuarios();

        return Inertia::render('Admin/Financeiro/Faturamento/Index',
            compact('vendas', 'planilhasGeradas', 'usuario', 'usuarios', 'mes', 'ano'));
    }

    public function planilha(Request $request)
    {
        (new FinanceiroFaturamento())->gerar($request->vendas);

        modalSucesso('Planilha gerada com sucesso!');
    }
}
