<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsStatusHistoricos;
use App\Models\Pedidos;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\HistoricoDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function update($id, Request $request)
    {
        try {
            (new LeadsANTIGO())->atualizar($id, $request);
            modalSucesso('Dados Atualizados com sucesso!');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
    }

    public function getLead($id, Request $request)
    {
        $idUsuario = id_usuario_atual();

        $lead = (new LeadsANTIGO())->getDados($id);
        $usuarios = (new User())->getUsuarios($lead['infos']['setor']);

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

        return response()->json(compact( 'lead', 'historicos', 'usuarios', 'permissoes'));
    }
}
