<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsImportarHistoricos;
use App\Models\User;
use App\Services\Leads\LeadsDadosService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImportarHistoricoController extends Controller
{
    public function index()
    {
        $historicos = (new LeadsImportarHistoricos())->historicos();

        return Inertia::render('Admin/Leads/Importar/Historico/Index', compact('historicos'));
    }

    public function show($id)
    {
        $leads = (new Leads)->importacao($id);
        $dadosimportacao = (new LeadsImportarHistoricos())->getDados($id);

        return Inertia::render('Admin/Leads/Importar/Historico/Show',
            compact('leads', 'dadosimportacao'));
    }

    public function destroy($id)
    {
        (new Leads)->removerImportacao($id);

        modalSucesso('Leads deletados com sucesso!');
        return redirect()->route('admin.clientes.leads.importar.index');
    }
}
