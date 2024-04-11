<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\FinanceirosSalarios;
use App\Models\FluxoCaixa;
use App\Models\Setores;
use App\Services\Dashboard\Vendas\FinanceirosService;
use App\Services\Financeiro\Salarios\SalariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceirosController extends Controller
{
    public function index(Request $request)
    {
        $setor = $request->setor ?? 1;
        $mes = $request->mes ?? date('n');
        $ano = $request->ano ?? date('Y');

        $setores = (new Setores())->get();

        $fluxoCaixa = (new FluxoCaixa())->entradas($mes, $ano);
        $salarios = (new FinanceirosSalarios())->financeiroMes($mes, $ano);


        $faturamento = (new FinanceirosService())->faturamento($ano);
        $prazos = (new FinanceirosService())->prazos($ano);

        return Inertia::render('Admin/Dashboard/Financeiros/Index',
            compact('fluxoCaixa', 'salarios', 'faturamento', 'prazos', 'mes', 'ano', 'setores', 'setor'));
    }
}
