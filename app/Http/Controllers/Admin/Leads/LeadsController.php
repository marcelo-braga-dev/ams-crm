<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\User;
use App\Services\Leads\LeadsDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index()
    {
        $dados = (new LeadsDadosService())->getDisponiveis();
        $consultores = (new User())->getConsultores();

        return Inertia::render('Admin/Leads/Index',
            compact('dados', 'consultores'));
    }

    public function create()
    {
        return Inertia::render('Admin/Leads/Create');
    }

    public function store(Request $request)
    {
        foreach ($request->all() as $item) {
            $pessoa = 1;
            try {
                if (!empty($item['pessoa'])) {
                    if ($item['pessoa'] == 'pj') $pessoa = 0;
                }

                (new Leads())->create($item, $pessoa);
            } catch (\DomainException) {
                modalErro('Alguns LEADS não cadastrados');
            }
        }

        return redirect()->route('admin.clientes.leads.leads-main.index');
    }

    public function updateConsultor(Request $request)
    {
        (new Leads())->setConsultor($request->get('consultor'), $request->get('selected'));

        modalSucesso('Informações armazenadas com sucesso!');
        return redirect()->back();
    }

    public function cadastrados()
    {
        $dados = (new LeadsDadosService())->getAll();

        return Inertia::render('Admin/Leads/Cadastrados',
            compact('dados'));
    }
}
