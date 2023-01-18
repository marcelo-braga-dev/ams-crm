<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function create()
    {
        $leads = (new Leads())->getDisponiveis();
        $consultores = (new User())->getConsultores();

        return Inertia::render('Admin/Leads/Create',
            compact('leads', 'consultores'));
    }

    public function store(Request $request)
    {
        (new Leads())->setConsultor($request->get('consultor'), $request->get('selected'));

        modalSucesso('Informações armazenadas com sucesso!');
        return redirect()->back();
    }
}
