<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
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
        $modelo = asset('storage/importacao/importacao_leads_modelo.csv');

        return Inertia::render('Admin/Leads/Importar/Index',
            compact('setores', 'modelo'));
    }

    public function store(Request $request)
    {
        try {
            $dados = (new ImportarArquivoService())->dados($request);

            $dadosSeparados = (new DadosImportacaoService())->executar($dados);

            $qtd = 0;
            foreach ($dadosSeparados as $item) {
                $qtd += (new Leads())->create($item, $request->setor);
            }

            (new LeadsImportarHistoricos())->create($request->setor, $qtd);

        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso("Importação Realizada com sucesso!");
        return redirect()->route('admin.clientes.leads.importar-historico.index');
    }
}
