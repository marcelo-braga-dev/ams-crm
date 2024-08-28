<?php

namespace App\Http\Controllers\Admin\Leads\Kanban;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Services\Permissoes\LeadsKanbanPermissoesServices;
use App\src\Leads\StatusLeads;
use App\src\Usuarios\Permissoes\LeadsKanban;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KanbanController extends Controller
{
    public function index()
    {
        $status = (new LeadsKanbanPermissoesServices())->permissoesUsuario(id_usuario_atual());

        $registros = (new Leads)->agrupadosPorStatus($status);

        return Inertia::render('Admin/Leads/Kanban/Index', compact('registros'));
    }
}
