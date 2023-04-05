<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Leads\CardLeadsService;
use App\Services\Leads\LeadsDadosService;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatoriosController extends Controller
{
    public function index()
    {
        $qtdLeads = (new LeadsUsuariosService())->get();

        return Inertia::render('Admin/Leads/Relatorios/Index', compact('qtdLeads'));
    }

    public function show($id)
    {
        return Inertia::render('Admin/Leads/Relatorios/Show', compact('id'));
    }
}
