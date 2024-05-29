<?php

namespace App\Http\Controllers\Admin\Leads;

use App\Http\Controllers\Controller;
use App\Models\Enderecos;
use App\Models\Leads;
use App\Models\LeadsHistoricos;
use App\Models\LeadsImportarHistoricos;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\HistoricoDadosService;
use App\Services\Leads\Relatorios\LeadsUsuariosService;
use App\Services\Setores\SetoresService;
use App\Services\Leads\LeadsDadosService;
use App\src\Leads\Status\AtivoStatusLeads;
use App\src\Leads\UpdateStatusLeads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index(Request $request)
    {
        $categorias = (new SetoresService())->setores();

        $datasImportacao = (new LeadsImportarHistoricos())->datasImportacao();

        return Inertia::render('Admin/Leads/Encaminhar',
            compact('datasImportacao', 'categorias'));
    }

    public function cadastrados(Request $request)
    {
        $categorias = (new SetoresService())->setores();
        $datasImportacao = (new LeadsImportarHistoricos())->datasImportacao();
        $isLeadsEncaminhar = (new UsersPermissoes())->isLeadsEncaminhar(id_usuario_atual());
        $isLeadsExcluir = (new UsersPermissoes())->isLeadsExcluir(id_usuario_atual());

        return Inertia::render('Admin/Leads/Cadastrados',
            compact('categorias', 'datasImportacao', 'isLeadsEncaminhar', 'isLeadsExcluir'));
    }

    public function leadsCadastrados(Request $request)
    {
        $categoriaAtual = $request->setor ?? 1;
        $usuarios = (new User())->getUsuariosNomes($categoriaAtual);
        $dados = (new Leads())->getDadosMinimo($categoriaAtual, $request->com_sdr, $request->com_consultor, $request->importacao);

        return response()->json(['leads' => $dados, 'categoria_atual' => $categoriaAtual, 'usuarios' => $usuarios]);
    }

    public function registrosEncaminhar(Request $request)
    {
        $categoriaAtual = $request->setor ?? 1;
        $idImportacao = $request->id_importacao;
        $usuariosSdr = (new User())->usuariosSdr();
        $usuariosVendedor = (new User())->usuariosRecebeLeads();

        $dados = (new Leads())->getDisponiveis($categoriaAtual, $idImportacao);

        return ['registros' => $dados, 'usuarios_sdr' => $usuariosSdr, 'usuarios_vendedor' => $usuariosVendedor];
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
            is_sdr($request->consultor) ?
                (new Leads())->setSdr($request->leadsSelecionados, $request->consultor) :
                (new Leads())->setConsultor($request->leadsSelecionados, $request->consultor);

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
            (new Leads())->remover($request->lead);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

        return redirect()->route('admin.clientes.leads.leads-cadastrados');
    }

    public
    function ocultar(Request $request)
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

    public
    function ocultos(Request $request)
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
        $dados = (new Leads())->getLeadsComConsultor($categoriaAtual);
        $consultores = (new User())->getUsuarios($categoriaAtual);
        $categorias = (new SetoresService())->setores();

        return Inertia::render('Admin/Leads/AlterarConsultor',
            compact('dados', 'consultores', 'categorias', 'categoriaAtual'));
    }

    public function show($id)
    {
        $dados = (new Leads())->getDados($id);
        $historicos = (new HistoricoDadosService())->dados($id);
        $usuarios = (new User())->getUsuarios($dados['infos']['setor']);
        $historicoPedidos = (new Pedidos())->historicoPedidosLead($id);
        $isLeadsEncaminhar = (new UsersPermissoes())->isLeadsEncaminhar(id_usuario_atual());
        $isLeadsLimpar = (new UsersPermissoes())->isLeadsLimpar(id_usuario_atual());
        $isEditar = (new UsersPermissoes())->isLeadsEditar(id_usuario_atual());
        $isExcluir = (new UsersPermissoes())->isLeadsExcluir(id_usuario_atual());

        return Inertia::render('Admin/Leads/Lead/Show',
            compact('dados', 'historicos', 'usuarios', 'historicoPedidos', 'isLeadsEncaminhar', 'isLeadsLimpar', 'isEditar', 'isExcluir'));
    }

    public function edit($id)
    {
        $dados = (new Leads())->find($id);
        $endereco = (new Enderecos())->get($dados->endereco);

        $urlAnterior = url()->previous();

        return Inertia::render('Admin/Leads/Lead/Edit',
            compact('dados', 'endereco', 'urlAnterior'));
    }

    public function update($id, Request $request)
    {
        try {
            (new Leads())->atualizar($id, $request);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
            return redirect()->back();
        }

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

    public function removerConsultor(Request $request)
    {
        (new Leads())->removerConsultor($request->lead);

        return redirect()->back();
    }

    public function removerSdr(Request $request)
    {
        (new Leads())->removerSdr($request->lead);

        return redirect()->back();
    }

    public function finaliarStatus($id, Request $request)
    {
        (new UpdateStatusLeads())->setFinalizado($id);
        (new LeadsHistoricos())->createHistorico($id, (new AtivoStatusLeads())->getStatus());

        modalSucesso('Status Atualizado com sucesso!');
        return redirect()->route('admin.leads.cards-finalizado.show', $id);
    }
}
