<?php

namespace App\Services\Lead\Importar;

use App\Models\Lead\LeadImportarHistorico;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsImportarHistoricos;
use App\Services\Leads\Importar\DadosImportacaoService;

class ImportarLeadService
{
    private int $setor;
    private int $historicoId;

    public function importar($request)
    {
        set_time_limit(600);

        $this->setor = $request->setor;

        $this->historicoCriar();

        $arquivoDados = (new ImportarArquivoService())->getDadosArquivo($request, $this->historicoId);

        $dadosSeparados = (new DadosImportacaoService())->executar($arquivoDados, $request->tipo_planilha, $request->pessoa);

        foreach ($dadosSeparados as $item) {
            (new LeadsANTIGO())->createOrUpdatePlanilhas($item, $request->setor, $this->historicoId);
        }

        (new LeadsImportarHistoricos())->atualizar($this->historicoId, $dadosSeparados);
    }

    private function historicoCriar()
    {
        $this->historicoId = (new LeadImportarHistorico())
            ->create([
                'user_id' => id_usuario_atual(),
                'setor_id' => $this->setor,
                'status' => 'iniciado',
            ])->id;
    }
}
