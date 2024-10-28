<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsImportarHistoricos;
use App\Services\Leads\Importar\DadosImportacaoService;
use App\Services\Leads\Importar\ImportarArquivoService;
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
        set_time_limit(600);
        try {
            $idHistorico = (new LeadsImportarHistoricos())->create($request->setor);

            $dados = (new ImportarArquivoService())->dados($request, $idHistorico);

            $dadosSeparados = (new DadosImportacaoService())->executar($dados, $request->tipo_planilha);

            foreach ($dadosSeparados as $item) {
                (new LeadsANTIGO())->createOrUpdatePlanilhas($item, $request->setor, $idHistorico);
            }

        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        (new LeadsImportarHistoricos())->atualizar($idHistorico, $dadosSeparados);

        modalSucesso("Importação Realizada com sucesso!");
        return redirect()->route('admin.clientes.leads.importar.index');
    }
}
