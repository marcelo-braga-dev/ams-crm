<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsImportarHistoricos;
use App\Services\Lead\Importar\ImportarLeadService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ImportarController extends Controller
{
    public function index()
    {
        $setores = (new SetoresService())->setores();
        $modelo = asset('storage/importacao/modelos/importacao_leads_modelo.csv');
        $historicos = (new LeadsImportarHistoricos())->historicos();

        return Inertia::render('Admin/Leads/Importar/Index',
            compact('setores', 'modelo', 'historicos'));
    }

    public function store(Request $request)
    {
        try {
            (new ImportarLeadService())->importar($request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
        modalSucesso("Importação Realizada com sucesso!");
        return redirect()->back();
    }
}
