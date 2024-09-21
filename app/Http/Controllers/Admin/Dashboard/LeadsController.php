<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsANTIGO;
use App\Models\LeadsEncaminhados;
use App\Models\LeadsStatusHistoricos;
use App\Models\Setores;
use App\Models\User;
use App\src\Leads\Status\FinalizadoStatusLeads;
use App\src\Leads\Status\NovoStatusLeads;
use App\src\Leads\Status\PreAtendimentoStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index()
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');

        $setores = (new Setores())->get();

        return Inertia::render('Admin/Dashboard/Leads/Index',
            compact('mes', 'ano', 'setores'));
    }

    public function relatorios(Request $request)
    {
        $mes = $request->mes;
        $ano = $request->ano;
        $setor = $request->setor ?? 1;
        $userId = $request->id;

        $usuariosSdr = (new User())->usuariosSdr();
        $usuariosConsultores = (new User())->usuariosConsultores();

        $registrosUsuario = (new LeadsStatusHistoricos())->qtdUsuario($userId, $mes, $ano);
        $registrosStatus = (new LeadsANTIGO())->relatorioLeads();

        $statusQtds = [
            'novo' => (new LeadsStatusHistoricos())->periodoStatus((new NovoStatusLeads())->getStatus(), $mes, $ano),
            'pre_atendimento' => (new LeadsStatusHistoricos())->periodoStatus((new PreAtendimentoStatusLeads())->getStatus(), $mes, $ano),
            'encaminhados' => (new LeadsEncaminhados())->relatorio($mes, $ano),
            'ativos' => (new LeadsEncaminhados())->ativosQtd($mes, $ano),
            'finalizados' => (new LeadsStatusHistoricos())->periodoStatus((new FinalizadoStatusLeads())->getStatus(), $mes, $ano),
        ];

        $statusHistoricos = (new LeadsStatusHistoricos())->qtdUsuarios($mes, $ano);

        return response()->json([
            'usuarios_sdr' => $usuariosSdr,
            'usuarios_consultores' => $usuariosConsultores,
            'registros_usuario' => $registrosUsuario,
            'registros_status' => $registrosStatus,
            'status_qtds' => $statusQtds,
            'status_qtd' => $statusHistoricos,
        ]);
    }
}
