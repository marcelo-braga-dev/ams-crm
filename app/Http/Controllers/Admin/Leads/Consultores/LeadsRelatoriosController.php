<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsHistoricos;
use App\Models\LeadsHistoricosComentarios;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use Illuminate\Http\Request;

class LeadsRelatoriosController extends Controller
{
    public function updateConsultor(Request $request)
    {

        (new LeadsANTIGO())->setConsultor([$request->lead], $request->novo_consultor);
//        (new LeadsNotificacao())->notificar($request->novo_consultor, 1, [$request->lead]);

        modalSucesso('Consultor(a) Atualizado com sucesso!');
        return redirect()->back();
//        return redirect()->route('admin.leads.consultores-cards.index', ['id' => $request->consultor]);
    }

    public function adicionarComentarios(Request $request)
    {
        (new LeadsHistoricosComentarios())->create($request->id, $request->msg);
        $request->consultor && (new LeadsNotificacao())->notificarComentarios($request->consultor, $request->msg, $request->lead);

        return redirect()->back();
    }

    public function atualizarStatus(Request $request)
    {
        if ($request->salvar_msg) {
            (new LeadsHistoricos())->create($request->lead, $request, $request->status);

            modalSucesso('Status atualizado!');
            return redirect()->back();
        }
    }
}
