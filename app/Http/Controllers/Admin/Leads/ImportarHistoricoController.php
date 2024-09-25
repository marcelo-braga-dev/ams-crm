<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsImportarHistoricos;
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
        $leads = (new LeadsANTIGO)->importacao($id);
        $dadosimportacao = (new LeadsImportarHistoricos())->getDados($id);

        return Inertia::render('Admin/Leads/Importar/Historico/Show',
            compact('leads', 'dadosimportacao'));
    }

    public function destroy($id)
    {
        (new LeadsANTIGO)->removerImportacao($id);

        modalSucesso('Leads deletados com sucesso!');
        return redirect()->route('admin.clientes.leads.importar.index');
    }
}
