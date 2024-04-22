<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\Notificacoes;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\Relatorios\ConsultoresService;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use App\Services\Setores\SetoresService;
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

        $url = (new Leads())->relatorio($setor);
        return redirect($url);
    }

    public function dados(Request $request)
    {
        $statusLeads = (new LeadsUsuariosService())->get($request->setor);
        $historicoLeads = (new Notificacoes())->getHistorico(null, $request->setor, 100);

        return response()->json(['status_leads' => $statusLeads, 'historico_leads' => $historicoLeads]);
    }
}
