<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsNEW;
use App\Models\Leads\Leads;
use App\Models\LeadsStatusHistoricos;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\StatusLeads\AFazerStatusLeads;
use App\src\Leads\StatusLeads\ConcluidoStatusLeads;
use App\src\Leads\StatusLeads\EmProgressoStatusLeads;
use App\src\Leads\StatusLeads\FinalizadosStatusLeads;
use App\src\Leads\StatusLeads\InativoStatusLeads;
use App\src\Leads\StatusLeads\NovoStatusLeads;
use App\src\Leads\StatusLeads\RevisaoStatusLeads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function show($id, Request $request)
    {
        $idUsuario = id_usuario_atual();

        $dados = (new Leads())->getDados($id);
        $usuarios = (new User())->getUsuarios($dados['infos']['setor']);

        $permissoes = [
            'encaminhar' => (new UsersPermissoes())->isLeadsEncaminhar($idUsuario),
            'limpar' => (new UsersPermissoes())->isLeadsLimpar($idUsuario),
            'editar' => (new UsersPermissoes())->isLeadsEditar($idUsuario),
            'excluir' => (new UsersPermissoes())->isLeadsExcluir($idUsuario),
            'inativar' => (new UsersPermissoes())->isLeadsInativar($idUsuario),
        ];

        $historicos = [
            'status' => (new LeadsStatusHistoricos())->getId($id),
            'pedidos' => (new Pedidos())->historicoPedidosLead($id),
            'atendimento' => (new HistoricoDadosService())->dados($id),
        ];

        return Inertia::render('Geral/Leads/Show',
            compact('dados', 'historicos', 'usuarios', 'permissoes'));
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Geral/Leads/Create', compact('setores'));
    }

    public function store(Request $request)
    {
        try {
            $id = (new Leads())->create($request, $request->setor);

            modalSucesso('Lead Cadastrado com sucesso!');
            return redirect()->route('admin.clientes.leads.leads-main.show', $id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
    }

    public function novo($id)
    {
        (new AFazerStatusLeads())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function fazer($id)
    {
        (new EmProgressoStatusLeads())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function progresso($id)
    {
        (new RevisaoStatusLeads())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function revisao($id)
    {
        (new ConcluidoStatusLeads())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function concluido($id)
    {
        (new FinalizadosStatusLeads())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function finalizados($id)
    {
        (new InativoStatusLeads())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function inativos($id)
    {
        modalSucesso('Status atualizado com sucesso!');
    }
}
