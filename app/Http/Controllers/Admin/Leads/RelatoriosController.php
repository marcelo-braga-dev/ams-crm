<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsANTIGO;
use App\Models\Notificacoes;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\Relatorios\ConsultoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatoriosController extends Controller
{
    public function index()
    {
        $setor = 1;

        $setores = (new Setores())->get();

        return Inertia::render(
            'Admin/Leads/Relatorios/Index',
            compact('setores', 'setor')
        );
    }

    public function show($id)
    {
        $qtdLeadsStatus = (new ConsultoresService())->qtdLeadsStatus($id);
        $qtdAtendimentoTipo = (new ConsultoresService())->qtdAtendimentoTipo($id);
        $meioContato = (new ConsultoresService())->meioContato($id);
        $historicoLeads = (new Notificacoes())->getHistorico($id);
        $usuario = (new User())->get($id);

        return Inertia::render(
            'Admin/Leads/Relatorios/Show',
            compact(
                'id',
                'qtdLeadsStatus',
                'qtdAtendimentoTipo',
                'meioContato',
                'historicoLeads',
                'usuario'
            )
        );
    }

    public function relatorio(Request $request)
    {
        $setor = $request->setor ?? 1;

        $url = (new LeadsANTIGO())->relatorio($setor);
        return redirect($url);
    }

    public function dados(Request $request)
    {
        $historicoLeads = (new Notificacoes())->getHistorico(null, 100);

        return response()->json(['historico_leads' => $historicoLeads]);
    }
}
