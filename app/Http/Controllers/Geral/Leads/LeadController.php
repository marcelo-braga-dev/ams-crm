<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Repositories\Lead\LeadRepository;
use App\Services\Leads\HistoricoDadosService;
use Illuminate\Http\Request;

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

//        $lead = (new LeadsANTIGO())->getDados($id);
        $lead = (new LeadRepository)->findAllData($id);

        $usuarios = (new User())->getUsuarios($lead['setor']['id']);

        $permissoes = [
            'encaminhar' => (new UsersPermissoes())->isLeadsEncaminhar($idUsuario),
            'limpar' => (new UsersPermissoes())->isLeadsLimpar($idUsuario),
            'editar' => (new UsersPermissoes())->isLeadsEditar($idUsuario),
            'excluir' => (new UsersPermissoes())->isLeadsExcluir($idUsuario),
            'inativar' => (new UsersPermissoes())->isLeadsInativar($idUsuario),
        ];
//
        $historicos = [
            'status' => (new LeadStatusHistoricos())->getId($id),
            'pedidos' => (new Pedidos())->historicoPedidosLead($id)
        ];

        return response()->json(compact( 'lead', 'historicos', 'usuarios', 'permissoes'));
    }
}
