<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatoriosController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Pedidos/Relatorio/Index');
    }
}
