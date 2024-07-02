<?php

namespace App\Http\Controllers\Consultor\Orcamentos;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\OrcamentosSolar;
use App\Models\ProdutosKitsSolar;
use App\src\Orcamentos\BuscarKits;
use App\src\Orcamentos\CalcularPotencia;
use App\src\Orcamentos\EstruturasGeradores;
use App\src\Orcamentos\Propostas\GerarProposta;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrcamentosController extends Controller
{
    public function index()
    {
        return Inertia::render('Consultor/Orcamentos/Index');
    }

    public function create(Request $request)
    {
        $lead = (new Leads())->find($request->lead);
        $estruturas = (new EstruturasGeradores())->estruturasNomesId();

        return Inertia::render('Consultor/Orcamentos/Create/Create',
            compact('lead', 'estruturas'));
    }

    public function store(Request $request)
    {
        $id = (new OrcamentosSolar())->create($request);

        return redirect()->route('consultor.orcamentos.show', $id);
    }

    public function show($id)
    {
        return Inertia::render('Consultor/Orcamentos/Show');
    }

    public function buscarGeradores(Request $request)
    {
        $kits = (new BuscarKits())->getKits($request);

        return response()->json($kits);
    }

    public function orcamentoPdf()
    {
        (new GerarProposta())->gerar();
    }
}
