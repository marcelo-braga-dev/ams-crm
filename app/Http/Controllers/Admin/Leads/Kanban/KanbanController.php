<?php

namespace App\Http\Controllers\Admin\Leads\Kanban;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\src\Leads\StatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KanbanController extends Controller
{
    public function index()
    {
        $registros = (new Leads)->agrupadosPorStatus();

//        print_pre($registros);

        return Inertia::render('Admin/Leads/Kanban/Index', compact('registros'));
    }
}
