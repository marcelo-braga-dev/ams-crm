<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Dashboard\Vendas\FinanceirosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceirosController extends Controller
{
    public function index()
    {
        $faturamento = (new FinanceirosService())->faturamento();
        $prazos = (new FinanceirosService())->prazos();

        return Inertia::render('Admin/Dashboard/Financeiros/Index',
            compact('faturamento', 'prazos'));
    }
}
