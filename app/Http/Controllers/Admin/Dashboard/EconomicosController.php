<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Dashboard\Vendas\EconomicosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EconomicosController extends Controller
{
    public function index()
    {
        $lucros = (new EconomicosService())->lucros();

        return Inertia::render('Admin/Dashboard/Economicos/Index',
        compact('lucros'));
    }
}
