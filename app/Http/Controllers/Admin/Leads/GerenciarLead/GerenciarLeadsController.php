<?php

namespace App\Http\Controllers\Admin\Leads\GerenciarLead;

use App\Http\Controllers\Controller;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GerenciarLeadsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Leads/Gerenciar/Index');
    }

    public function getRegistros(Request $request)
    {
        $statusLeads = (new LeadsUsuariosService())->get($request->setor);

        return response()->json(['registros' => $statusLeads]);
    }
}
