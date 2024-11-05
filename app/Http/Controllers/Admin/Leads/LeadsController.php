<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsDEPREECATED\LeadsCopias;
use App\Models\LeadsDEPREECATED\LeadsTelefones;
use App\Models\LeadsHistoricos;
use App\Models\LeadsImportarHistoricos;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\LeadsDadosService;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use App\Services\Setores\SetoresService;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\StatusLeads;
use App\src\Leads\UpdateStatusLeads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function cadastrados(Request $request)
    {
        $categorias = (new SetoresService())->setores();
        $datasImportacao = (new LeadsImportarHistoricos())->datasImportacao();
        $isLeadsEncaminhar = (new UsersPermissoes())->isLeadsEncaminhar(id_usuario_atual());
        $isLeadsExcluir = (new UsersPermissoes())->isLeadsExcluir(id_usuario_atual());
        $statusleads = (new StatusLeads())->status();

        return Inertia::render('Admin/Leads/Encaminhar/Index',
            compact('categorias', 'statusleads', 'datasImportacao', 'isLeadsEncaminhar', 'isLeadsExcluir'));
    }

    public function show($id)
    {
        $idUsuario = id_usuario_atual();

        $dados = (new LeadsANTIGO())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $usuarios = (new User())->getUsuarios($dados['infos']['setor']);
        $historicoPedidos = (new Pedidos())->historicoPedidosLead($id);
        $historicoStatus = (new LeadStatusHistoricos())->getId($id);
        $isLeadsEncaminhar = (new UsersPermissoes())->isLeadsEncaminhar($idUsuario);
        $isLeadsLimpar = (new UsersPermissoes())->isLeadsLimpar($idUsuario);
        $isEditar = (new UsersPermissoes())->isLeadsEditar($idUsuario);
        $isExcluir = (new UsersPermissoes())->isLeadsExcluir($idUsuario);
        $isInativar = (new UsersPermissoes())->isLeadsInativar($idUsuario);
        $leadDadosHistoricos = (new LeadsCopias())->get($id);

        return Inertia::render('Admin/Leads/Lead/Show',
            compact('dados', 'historicos', 'usuarios', 'historicoPedidos', 'historicoStatus',
                'isLeadsEncaminhar', 'isLeadsLimpar', 'isEditar', 'isExcluir', 'isInativar', 'leadDadosHistoricos'));
    }

    public function leadsCadastradosPaginate(Request $request)
    {
        $categoriaAtual = $request->filtros['setor'] ?? 1;
        $usuarios = (new User())->getUsuariosNomes($categoriaAtual);
        $dados = (new LeadsANTIGO())->getDadosMinimoPaginate($categoriaAtual, $request->filtros);

        return response()->json(['leads' => $dados, 'categoria_atual' => $categoriaAtual, 'usuarios' => $usuarios]);
    }

    public function leadsCadastrados(Request $request)
    {
        $categoriaAtual = $request->setor ?? 1;
        $usuarios = (new User())->getUsuariosNomes($categoriaAtual);
        $dados = (new LeadsANTIGO())->getDadosMinimo($categoriaAtual, $request->com_sdr, $request->com_consultor, $request->importacao);

        return response()->json(['leads' => $dados, 'categoria_atual' => $categoriaAtual, 'usuarios' => $usuarios]);
    }

    public function registrosEncaminhar(Request $request)
    {
        $categoriaAtual = $request->setor ?? 1;
        $idImportacao = $request->id_importacao;
        $usuariosSdr = (new User())->usuariosSdr();
        $usuariosVendedor = (new User())->usuariosRecebeLeads();

        $dados = (new LeadsANTIGO())->getDisponiveis($categoriaAtual, $idImportacao);

        return ['registros' => $dados, 'usuarios_sdr' => $usuariosSdr, 'usuarios_vendedor' => $usuariosVendedor];
    }

    public function create()
    {
        $setores = (new Setores())->setores();

        return Inertia::render('Admin/Leads/Lead/Create', compact('setores'));
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

    public function updateConsultor(Request $request)
    {
        try {
            is_sdr($request->consultor) ?
                (new LeadsANTIGO())->setSdr($request->leadsSelecionados, $request->consultor) :
                (new LeadsANTIGO())->setConsultor($request->leadsSelecionados, $request->consultor);

            // Notificar Leads
            if (count($request->leadsSelecionados)) (new LeadsNotificacao())->notificar($request->consultor, count($request->leadsSelecionados), $request->leadsSelecionados);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        modalSucesso('Informações armazenadas com sucesso!');
        return redirect()->back();
    }

    public function delete(Request $request)
    {
        try {
            (new LeadsANTIGO())->remover($request->lead);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        if ($request->return_back) return redirect()->back();
        return redirect()->route('admin.clientes.leads.leads-cadastrados');
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

    public function ocultos(Request $request)
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
        $isSdr = is_sdr($request->novo_consultor);
        $isSdr ?
            (new LeadsANTIGO())->setSdr($request->idLeads, $request->novo_consultor, $request->alterarStatus) :
            (new LeadsANTIGO())->setConsultor($request->idLeads, $request->novo_consultor, $request->alterarStatus);

        modalSucesso('Leads enviado com sucesso!');
    }


    public function edit($id)
    {
        $dados = (new LeadsANTIGO())->find($id);
        $endereco = (new Enderecos())->get($dados->endereco);
        $telefones = (new LeadsTelefones())->get($id);

        $urlAnterior = url()->previous();

        return Inertia::render('Admin/Leads/Lead/Edit',
            compact('dados', 'endereco', 'telefones', 'urlAnterior'));
    }

    public function update($id, Request $request)
    {
        try {
            (new LeadsANTIGO())->atualizar($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        modalSucesso("Dados atualizado com sucesso!");
        return redirect()->back();
    }

    public function limparConsultor(Request $request)
    {
        try {
            if (!empty($request->leadsSelecionados)) {
                foreach ($request->leadsSelecionados as $item) {
                    (new UpdateStatusLeads())->ocultar($item);
                    (new LeadsANTIGO())->setConsultor($item, null);
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

    public function removerConsultor(Request $request)
    {
        (new LeadsANTIGO())->removerConsultor($request->lead);

        return redirect()->back();
    }

    public function removerSdr(Request $request)
    {
        (new LeadsANTIGO())->removerSdr($request->lead);

        return redirect()->back();
    }

    public function finaliarStatus($id, Request $request)
    {
        (new UpdateStatusLeads())->setFinalizado($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtivoStatusLeads())->getStatus());

        modalSucesso('Status Atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-finalizado.show', $id);
    }

    public function limparSdr(Request $request)
    {
        $idLeads = $request->id ? [$request->id] : $request->idLeads;
        (new LeadsANTIGO())->setSdr($idLeads, null, $request->alterarStatus);

        modalSucesso('Consultor(a) removido com sucesso!');
    }

    public function alterarSdr(Request $request)
    {
        $isSdr = is_sdr($request->novo_sdr);
        $isSdr ?
            (new LeadsANTIGO())->setSdr($request->idLeads, $request->novo_sdr, $request->alterarStatus) :
            (new LeadsANTIGO())->setConsultor($request->idLeads, $request->novo_sdr, $request->alterarStatus);

        modalSucesso('Leads enviado com sucesso!');
    }

    public function inativarLead(Request $request)
    {
        (new LeadsANTIGO())->inativar($request->id);

        modalSucesso('Lead inativado com sucesso!');
    }

    public function reativarLead(Request $request)
    {
        (new LeadsANTIGO())->reativar($request->id);

        modalSucesso('Lead inativado com sucesso!');
    }
}
