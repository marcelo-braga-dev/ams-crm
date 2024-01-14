<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Models\Setores;
use App\Models\User;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use App\Services\Setores\SetoresService;
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
        $categorias = (new SetoresService())->setores();
        $dados = (new LeadsDadosService())->getDisponiveis($categoriaAtual);
        $consultores = (new User())->getConsultores($categoriaAtual);

        return Inertia::render('Admin/Leads/Encaminhar',
            compact('dados', 'consultores', 'categorias', 'categoriaAtual'));
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Leads/Lead/Create', compact('setores'));
    }

    public function store(Request $request)
    {
        (new Leads())->create($request, $request->setor);

        return redirect()->route('admin.clientes.leads.leads-main.index');
    }

    public function updateConsultor(Request $request)
    {
        try {
            $idLeads = [];
            if (!empty($request->leadsSelecionados)) {
                foreach ($request->leadsSelecionados as $item) {
                    $idLeads[] = $item;
                    (new Leads())->setConsultor($item, $request->consultor);
                }
            }
            // Notificar Leads
            if (count($request->leadsSelecionados)) (new LeadsNotificacao())->notificar($request->consultor, count($request->leadsSelecionados), $idLeads);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        modalSucesso('Informações armazenadas com sucesso!');
        return redirect()->back();
    }

    public function cadastrados(Request $request)
    {
        $categoriaAtual = $request->categoria ?? 1;
        $categorias = (new SetoresService())->setores();

        $dados = (new Leads())->getResumido($categoriaAtual);

        return Inertia::render('Admin/Leads/Cadastrados',
            compact('dados', 'categorias', 'categoriaAtual'));
    }

    public function delete(Request $request)
    {
        try {
            if (!empty($request->leadsSelecionados)) {
                foreach ($request->leadsSelecionados as $item) {
                    (new Leads())->remover($item);
                }
            }
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
    }

    public function ocultar(Request $request)
    {
        try {
            if (!empty($request->leadsSelecionados)) {
                foreach ($request->leadsSelecionados as $item) {
                    (new UpdateStatusLeads())->ocultar($item);
                }
            }
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        modalSucesso("Leads ocultado com sucesso!");
        return redirect()->back();
    }

    public function ocultos()
    {
        $categoriaAtual = $request->categoria ?? 1;

        $categorias = (new SetoresService())->setores();
        $dados = (new LeadsDadosService())->getOcultos($categoriaAtual);

        return Inertia::render('Admin/Leads/Ocultos',
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
        $consultores = (new User())->getConsultores($categoriaAtual);
        $categorias = (new SetoresService())->setores();

        return Inertia::render('Admin/Leads/AlterarConsultor',
            compact('dados', 'consultores', 'categorias', 'categoriaAtual'));
    }

    public function show($id)
    {
        $dados = (new LeadsDadosService())->lead($id);
        $historicos = (new HistoricoDadosService())->dados($id);

        return Inertia::render('Admin/Leads/Lead/Show',
            compact('dados', 'historicos'));
    }

    public function edit($id)
    {
        $dados = (new Leads())->find($id);
        $urlAnterior = url()->previous();

        return Inertia::render('Admin/Leads/Lead/Edit',
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
            if (!empty($request->leadsSelecionados)) {
                foreach ($request->leadsSelecionados as $item) {
                    (new UpdateStatusLeads())->ocultar($item);
                    (new Leads())->setConsultor($item, null);
                }
            }
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        modalSucesso('Informações atualizadas com sucesso!');
        return redirect()->back();
    }

    public function acompanharLeads()
    {
        $qtdLeads = (new LeadsUsuariosService())->get();

        return Inertia::render('Admin/Leads/AcompanharLeads/Index',
            compact('qtdLeads'));
    }
}
