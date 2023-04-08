<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
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
        $modelo = asset('storage/importacao/modelo_importacao_leads.xlsx');

        return Inertia::render('Admin/Leads/Importar/Index',
            compact('setores', 'modelo'));
    }

    public function store(Request $request)
    {
        $dados = (new ImportarArquivoService())->dados($request);

        $dadosSeparados = (new DadosImportacaoService())->executar($dados);

        foreach ($dadosSeparados as $item) {
            (new Leads())->create($item, $request->setor);
        }

        return redirect()->back();
    }
}
