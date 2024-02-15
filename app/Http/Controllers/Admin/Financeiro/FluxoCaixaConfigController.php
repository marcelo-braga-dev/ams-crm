<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FluxoCaixasConfig;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class FluxoCaixaConfigController extends Controller
{
    public function index()
    {
        $bancos = ['Santander', 'Unibanco', 'Sicoob'];
        $empresas = ['AMS', 'AGGRO', 'CASSATIN'];
        $fornecedores = ['FOR 1', 'FOR 2', 'FOR 3'];

        return Inertia::render('Admin/Financeiro/Config/Index', compact('bancos', 'empresas', 'fornecedores'));
    }

    public function store(Request $request)
    {
        (new FluxoCaixasConfig())->create($request);
    }
}
