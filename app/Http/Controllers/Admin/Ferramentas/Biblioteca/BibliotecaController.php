<?php

namespace App\Http\Controllers\Admin\Ferramentas\Biblioteca;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BibliotecaController extends Controller
{
    public function index()
    {
        $registros = [];

        return Inertia::render('Admin/Ferramentas/Bibliotecas/Index', compact('registros'));
    }
}
