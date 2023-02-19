<?php

namespace App\Http\Controllers\Supervisor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Categorias\CategoriasService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\UpdateStatusLeads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index(Request $request)
    {
        $categoriaAtual = $request->categoria ?? 1;
        $categorias = (new CategoriasService())->categorias();

        $dados = (new LeadsDadosService())->getDisponiveis($categoriaAtual);
        $consultores = (new User())->getConsultores();

        return Inertia::render('Supervisor/Leads/Encaminhar',
            compact('dados', 'consultores', 'categorias', 'categoriaAtual'));
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Supervisor/Leads/Lead/Create', compact('setores'));
    }

    public function store(Request $request)
    {
        foreach ($request->all() as $item) {
            $pessoa = 1;
            try {
                if (!empty($item['pessoa'])) {
                    if ($item['pessoa'] == 'pj') $pessoa = 0;
                }

                (new Leads())->create($item, $request->setor, $pessoa);
            } catch (\DomainException) {
                modalErro('Alguns LEADS não cadastrados');
            }
        }

        return redirect()->route('supervisor.clientes.leads.leads-main.index');
    }

    public function updateConsultor(Request $request)
    {
        try {
            $idLeads = [];
            if (!empty($request->leads)) {
                foreach ($request->leads as $item) {
                    $idLeads[] = $item['id'];
                    (new Leads())->setConsultor($item['id'], $request->consultor);
                }
            }

            // Notificar Leads
            if (count($request->leads)) (new LeadsNotificacao())->notificar($request->consultor, count($request->leads), $idLeads);
        } catch (\DomainException) {

        }

        modalSucesso('Informações armazenadas com sucesso!');
        return redirect()->back();
    }

    public function cadastrados(Request $request)
    {
        $categoriaAtual = $request->categoria ?? 1;
        $dados = (new LeadsDadosService())->getAll($categoriaAtual);
        $categorias = (new CategoriasService())->categorias();

        return Inertia::render('Supervisor/Leads/Cadastrados',
            compact('dados', 'categorias', 'categoriaAtual'));
    }

    public function delete(Request $request)
    {
        if (!empty($request->leads)) {
            foreach ($request->leads as $item) {
                (new Leads())->remover($item['id']);
            }
        }

        modalSucesso("Leads removidos com sucesso!");

        return redirect()->back();
    }

    public function ocultar(Request $request)
    {
        if (!empty($request->leads)) {
            foreach ($request->leads as $item) {
                (new UpdateStatusLeads())->ocultar($item['id']);
            }
        }
        modalSucesso("Leads ocultado com sucesso!");
        return redirect()->back();
    }

    public function ocultos(Request $request)
    {
        $categoriaAtual = $request->categoria ?? 1;

        $categorias = (new CategoriasService())->categorias();
        $dados = (new LeadsDadosService())->getOcultos($categoriaAtual);

        return Inertia::render('Supervisor/Leads/Ocultos',
            compact('dados', 'categorias', 'categoriaAtual'));
    }

    public function restaurar(Request $request)
    {
        if (!empty($request->leads)) {
            foreach ($request->leads as $item) {
                (new UpdateStatusLeads())->restaurar($item['id']);
            }
        }

        modalSucesso("Leads ocultado com sucesso!");
        return redirect()->back();
    }

    public function alterarConsultor(Request $request)
    {
        $categoriaAtual = $request->categoria ?? 1;
        $dados = (new LeadsDadosService())->getLeadsComConsultor($categoriaAtual);
        $consultores = (new User())->getConsultores();
        $categorias = (new CategoriasService())->categorias();

        return Inertia::render('Supervisor/Leads/AlterarConsultor',
            compact('dados', 'consultores', 'categorias', 'categoriaAtual'));
    }

    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $historicos = (new LeadsHistoricos())->dados($id);

        return Inertia::render('Supervisor/Leads/Lead/Show',
            compact('dados', 'historicos'));
    }

    public function edit($id)
    {
        $dados = (new Leads())->find($id);
        $urlAnterior = url()->previous();

        return Inertia::render('Supervisor/Leads/Lead/Edit',
            compact('dados', 'urlAnterior'));
    }

    public function update($id, Request $request)
    {
        (new Leads())->atualizar($id, $request);

        modalSucesso("Dados atualizado com sucesso!");
        return redirect($request->url);
    }

    public function limparConsultor(Request $request)
    {
        try {
            if (!empty($request->leads)) {
                foreach ($request->leads as $item) {
                    (new Leads())->setConsultor($item['id'], null);
                }
            }
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        modalSucesso('Informações armazenadas com sucesso!');
        return redirect()->back();
    }
}
