<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\Notificacoes;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardsController extends Controller
{
    public function index(Request $request)
    {

        $setor = $request->setor ?? 1;
        $setores = (new Setores())->get();

        $usuarios = (new User())->getUsuarios($setor);

        $statusLeads = (new LeadsUsuariosService())->get($request->setor);
        //print_pre($statusLeads);

        return Inertia::render('Admin/Leads/Card/Index',
            compact('usuarios', 'setor', 'setores', 'statusLeads'));
    }

    public function limparFinalizados(Request $request)
    {
        (new Leads())->limparFinalizados($request->id);

        modalSucesso('Ação realizada com sucesso!');
        return redirect()->back();
    }
}
