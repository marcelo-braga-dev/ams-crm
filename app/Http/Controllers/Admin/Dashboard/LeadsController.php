<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsEncaminhados;
use App\Models\Setores;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LeadsController extends Controller
{
    public function index()
    {
        $mes = $request->mes ?? [date('n')];
        $ano = $request->ano ?? date('Y');
        $setor = $request->setor ?? 1;
        $setores = (new Setores())->get();

        $registrosStatus = (new Leads())->relatorioLeads();

        $sdr = (new User())->usuariosSdr();

        $qtds = [
            'encaminhados' => (new LeadsEncaminhados())->relatorio($mes, $ano),
            'ativos' => (new LeadsEncaminhados())->ativosQtd($mes, $ano)
        ];
//        print_pre($qtds);

        return Inertia::render('Admin/Dashboard/Leads/Index',
            compact('registrosStatus', 'sdr', 'qtds', 'mes', 'ano', 'setor', 'setores'));
    }

    public function relatorios(Request $request)
    {
        $sdr = (new Leads())->relatorioUsuarios($request->id);

        return response()->json(['sdr' => $sdr]);
    }
}
