<?php

namespace App\Http\Controllers\Admin\Dashboard\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatorioLeadsController extends Controller
{
    public function index(Request $request)
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');
        $usuario = $request->id;

        $usuarios = (new User())->usuariosConsultores();

        $registros = (new LeadStatusHistoricos())->relatorioDashboard($usuario, $mes, $ano);

        return Inertia::render('Admin/Dashboard/Leads/Relatorios/Index',
            compact(['mes', 'ano', 'registros', 'usuarios', 'usuario']));
    }
}
