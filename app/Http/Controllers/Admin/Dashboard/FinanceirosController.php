<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Dashboard\Vendas\FinanceirosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceirosController extends Controller
{
    public function index(Request $request)
    {
        $ano = $request->ano ?? date('Y');

        $faturamento = (new FinanceirosService())->faturamento($ano);
        $prazos = (new FinanceirosService())->prazos($ano);

        return Inertia::render('Admin/Dashboard/Financeiros/Index',
            compact('faturamento', 'prazos', 'ano'));
    }
}
