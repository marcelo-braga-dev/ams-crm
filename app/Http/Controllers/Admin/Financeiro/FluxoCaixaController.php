<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FluxoCaixaController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Financeiro/FluxoCaixa/Index');
    }

    public function create()
    {
        return Inertia::render('Admin/Financeiro/FluxoCaixa/Create');
    }
}
