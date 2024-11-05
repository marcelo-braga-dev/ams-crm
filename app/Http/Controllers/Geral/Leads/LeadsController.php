<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\HistoricoDadosService;
use App\src\Leads\StatusLeads\AtivoStatusLead;
use App\src\Leads\StatusLeads\ConexaoProativaStatusLead;
use App\src\Leads\StatusLeads\ContatoDiretoStatusLead;
use App\src\Leads\StatusLeads\CotacaoEnviadoStatusLead;
use App\src\Leads\StatusLeads\FinalizadoStatusLead;
use App\src\Leads\StatusLeads\InativoStatusLead;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * @deprecated
 */
class LeadsController extends Controller
{
    public function show($id, Request $request)
    {
        $idUsuario = id_usuario_atual();

        $dados = (new LeadsANTIGO())->getDados($id);
        $usuarios = (new User())->getUsuarios($dados['infos']['setor']);
//        print_pre($dados);
        $permissoes = [
            'encaminhar' => (new UsersPermissoes())->isLeadsEncaminhar($idUsuario),
            'limpar' => (new UsersPermissoes())->isLeadsLimpar($idUsuario),
            'editar' => (new UsersPermissoes())->isLeadsEditar($idUsuario),
            'excluir' => (new UsersPermissoes())->isLeadsExcluir($idUsuario),
            'inativar' => (new UsersPermissoes())->isLeadsInativar($idUsuario),
        ];

        $historicos = [
            'status' => (new LeadStatusHistoricos())->getId($id),
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
            $id = (new LeadsANTIGO())->create($request, $request->setor);

            modalSucesso('Lead Cadastrado com sucesso!');
            return redirect()->route('admin.clientes.leads.leads-main.show', $id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }
    }

    public function update($id, Request $request)
    {
        try {
            (new LeadsANTIGO())->atualizar($id, $request);
            modalSucesso('Dados Atualizados com sucesso!');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
    }

    public function novo($id)
    {
        (new ConexaoProativaStatusLead())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function fazer($id)
    {
        (new ContatoDiretoStatusLead())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function progresso($id)
    {
        (new CotacaoEnviadoStatusLead())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function revisao($id)
    {
        (new AtivoStatusLead())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function concluido($id)
    {
        (new FinalizadoStatusLead())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function finalizados($id)
    {
        (new InativoStatusLead())->updateStatus($id);

        modalSucesso('Status atualizado com sucesso!');
    }

    public function inativos($id)
    {
        modalSucesso('Status atualizado com sucesso!');
    }
}
