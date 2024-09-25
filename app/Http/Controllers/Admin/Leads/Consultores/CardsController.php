<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Services\Leads\CardsLeadsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardsController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->id) {
            modalErro('Falha na abertura da página!');
            return redirect()->route('admin.leads.cards-leads.index');
        }

        $usuario = (new User())->get($request->id);
        $consultores = (new User())->usuariosConsultores();
        $sdrs = (new User())->usuariosSdr();
        $isLeadsLimpar = (new UsersPermissoes())->isLeadsLimpar(id_usuario_atual());
        $isLeadsEncaminhar = (new UsersPermissoes())->isLeadsEncaminhar(id_usuario_atual());

        return Inertia::render('Admin/Leads/Relatorios/Cards/Index',
            compact('usuario', 'sdrs', 'consultores', 'isLeadsLimpar', 'isLeadsEncaminhar'));
    }

    public function limparConsultor(Request $request)
    {
        $idLeads = $request->id ? [$request->id] : $request->idLeads;
        (new LeadsANTIGO())->setConsultor($idLeads, null);

        modalSucesso('Consultor(a) removido com sucesso!');
    }

//    public function update(Request $request)
//    {
//        $isSdr = is_sdr($request->novo_consultor);
//        $isSdr ?
//            (new Leads())->setSdr($request->idLeads, $request->novo_consultor) :
//            (new Leads())->setConsultor($request->idLeads, $request->novo_consultor);
//
//        modalSucesso('Leads enviado com sucesso!');
//        return redirect()->back();
//    }

    public function registros(Request $request)
    {
        $leads = (new CardsLeadsService())->getConsultor($request->id);

        return response()->json(['registros' => $leads]);
    }
}
