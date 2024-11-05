<?php

namespace App\Http\Controllers\Admin\Leads\GerenciarLead;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use Illuminate\Http\Request;

class RemoverStatusLeadsConsultorController extends Controller
{
    public function __invoke(Request $request)
    {
        (new LeadsANTIGO())->limparStatus($request->user, $request->status);

        modalSucesso('Ação realizada com sucesso!');
        return redirect()->back();
    }
}
