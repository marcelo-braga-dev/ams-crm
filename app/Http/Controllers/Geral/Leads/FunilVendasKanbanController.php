<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\Setores;
use App\Models\User;
use App\src\Leads\StatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FunilVendasKanbanController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Leads/Kanban/Index');
    }

    public function getIndexRegistros(Request $request)
    {
        $setor = $request->input("setor");
        $usuario = $request->input("usuario");

        $colunas = (new StatusLeads())->sequenciaStatusDadosIndice($usuario);
        $usuarios = (new User())->usuarios(true);
        $setores = (new Setores())->setores();

        $registros = (new Leads)->agrupadosPorStatus($setor, $usuario);

        return response()->json(compact('registros', 'usuarios', 'setores', 'colunas'));
    }
}
