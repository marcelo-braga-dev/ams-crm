<?php

namespace App\Http\Controllers\Admin\Relatorios;

use App\Http\Controllers\Controller;
use App\Services\Pedidos\PlanilhaProdutos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendasController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Relatorios/Index');
    }
}
