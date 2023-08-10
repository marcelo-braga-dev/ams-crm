<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\src\Pedidos\Notificacoes\Leads\LeadsNotificacao;
use Illuminate\Http\Request;

class LeadsRelatoriosController extends Controller
{
    public function updateConsultor(Request $request)
    {
        (new Leads())->setConsultor($request->lead, $request->novo_consultor);
        (new LeadsNotificacao())->notificar($request->novo_consultor, 1, [$request->lead]);

        modalSucesso('Consultor(a) Atualizado com sucesso!');
        return redirect()->route('admin.leads.consultores-cards.index', ['id' => $request->consultor]);
    }
}
