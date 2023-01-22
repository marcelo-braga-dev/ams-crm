<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Leads\CardLeadsService;
use App\Services\Leads\LeadsDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index()
    {
        $leads = (new CardLeadsService())->getConsultor();

        return Inertia::render('Consultor/Leads/Index',
            compact('leads'));
    }

    public function create()
    {
        return Inertia::render('Consultor/Leads/Create');
    }

    public function show($id)
    {
        $cliente = (new Leads())->newQuery()->find($id);
        return Inertia::render('Consultor/Leads/Show', compact('cliente'));
    }

    public function store(Request $request)
    {
        return redirect()->route('consultor.clientes.index');
    }
}
