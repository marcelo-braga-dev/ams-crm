<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\Pedidos;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Repositories\Lead\LeadRepository;
use Illuminate\Http\Request;

class GetLeadApiController extends Controller
{
   public function __invoke($id, Request $request)
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
