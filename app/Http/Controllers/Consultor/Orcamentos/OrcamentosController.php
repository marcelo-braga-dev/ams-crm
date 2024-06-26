<?php

namespace App\Http\Controllers\Consultor\Orcamentos;

use App\Http\Controllers\Controller;
use App\src\Orcamentos\Propostas\GerarProposta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrcamentosController extends Controller
{
    public function index()
    {
        return Inertia::render('Consultor/Orcamentos/Index');
    }

    public function show($id)
    {
        return Inertia::render('Consultor/Orcamentos/Show');
    }

    public function orcamentoPdf()
    {
        (new GerarProposta())->gerar();
    }
}
