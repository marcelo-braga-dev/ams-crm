<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsImportarHistoricos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImportarHistoricoController extends Controller
{
    public function index()
    {
        $historicos = (new LeadsImportarHistoricos())->historicos();

        return Inertia::render('Admin/Leads/Importar/Historico/Index', compact('historicos'));
    }
}
