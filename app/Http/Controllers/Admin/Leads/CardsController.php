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
        $statusLeads = (new LeadsUsuariosService())->get($request->setor);

        return Inertia::render('Admin/Leads/Card/Index',
            compact('statusLeads'));
    }

    public function limparFinalizados(Request $request)
    {
        (new Leads())->limparStatus($request->id, $request->status);

        modalSucesso('Ação realizada com sucesso!');
        return redirect()->back();
    }
}
