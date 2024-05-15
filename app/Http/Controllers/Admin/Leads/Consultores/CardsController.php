<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\User;
use App\Services\Leads\CardLeadsService;
use App\Services\Leads\CardsLeadsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardsController extends Controller
{
    public function index(Request $request)
    {
        $leads = (new CardsLeadsService())->getConsultor($request->id);
        $usuario = (new User())->get($request->id);
        $consultores = (new User())->getUsuarios();

        return Inertia::render('Admin/Leads/Relatorios/Cards/Index',
            compact('leads', 'usuario', 'consultores'));
    }

    public function limparConsultor(Request $request)
    {
        (new Leads())->setConsultor($request->id, null);

        return redirect()->route('admin.leads.consultores-cards.index', ['id' => $request->consultor]);
    }

    public function update(Request $request)
    {
        (new Leads())->setConsultor($request->idLeads, $request->novo_consultor);

        modalSucesso('Leads enviado com sucesso!');
        return redirect()->back();
    }
}
