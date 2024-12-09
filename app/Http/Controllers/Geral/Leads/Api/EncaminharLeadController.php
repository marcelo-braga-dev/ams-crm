<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Services\Lead\EncaminharLeadService;
use Illuminate\Http\Request;

class EncaminharLeadController extends Controller
{
    public function __invoke(Request $request)
    {
        $leads = $request->input('lead_ids');
        $consultor = $request->input('consultor_id');

        $errors = (new EncaminharLeadService())->encaminharOportunidade($leads, $consultor);

        if (!empty($errors)) {
            modalErro($errors);
            return redirect()->back();
        }

        modalSucesso('Lead encaminhado com sucesso!');
        return redirect()->back();
    }
}
