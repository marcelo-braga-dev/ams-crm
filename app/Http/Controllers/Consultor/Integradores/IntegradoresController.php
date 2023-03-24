<?php

namespace App\Http\Controllers\Consultor\Integradores;

use App\Http\Controllers\Controller;
use App\Models\Integradores;
use App\Models\Leads;
use App\src\Leads\Status\AtivoStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntegradoresController extends Controller
{
    public function index()
    {
        $integradores = (new Integradores())->getUsuario();

        return Inertia::render('Consultor/Integradores/Index', compact('integradores'));
    }

    public function create(Request $request): \Inertia\Response
    {
        $dadosLead = [];
        if ($request->idLeads) $dadosLead = (new Leads())->find($request->idLeads);

        return Inertia::render('Consultor/Integradores/Create', compact('dadosLead'));
    }

    public function store(Request $request)
    {
        (new Integradores())->create($request);
        if ($request->idLead) (new AtivoStatusLeads())->updateStatus($request->idLead);

        modalSucesso("Ação realizada com sucesso!");
        return redirect()->route('consultor.integradores.index');
    }

    public function show($id)
    {
        $integrador = (new Integradores())->get($id);

        return Inertia::render('Consultor/Integradores/Show', compact('integrador'));
    }

    public function edit($id)
    {
        $integrador = (new Integradores())->get($id);

        return Inertia::render('Consultor/Integradores/Edit', compact('integrador'));
    }

    public function update($id, Request $request)
    {
        (new Integradores())->atualizar($id, $request);

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->route('consultor.integradores.index');
    }
}
