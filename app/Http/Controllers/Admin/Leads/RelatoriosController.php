<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Notificacoes;
use App\Models\User;
use App\Services\Leads\Relatorios\ConsultoresService;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatoriosController extends Controller
{
    public function index()
    {
        $qtdLeads = (new LeadsUsuariosService())->get();
        $historicoLeads = (new Notificacoes())->getHistorico();

        return Inertia::render('Admin/Leads/Relatorios/Index',
            compact('qtdLeads', 'historicoLeads'));
    }

    public function show($id)
    {
        $qtdLeadsStatus = (new ConsultoresService())->qtdLeadsStatus($id);
        $qtdAtendimentoTipo = (new ConsultoresService())->qtdAtendimentoTipo($id);
        $meioContato = (new ConsultoresService())->meioContato($id);
        $historicoLeads = (new Notificacoes())->getHistorico($id);
        $usuario = (new User())->get($id);

        return Inertia::render('Admin/Leads/Relatorios/Show',
            compact('id', 'qtdLeadsStatus', 'qtdAtendimentoTipo',
                'meioContato', 'historicoLeads', 'usuario'));
    }
}
