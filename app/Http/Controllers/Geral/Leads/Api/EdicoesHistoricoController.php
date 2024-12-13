<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsCopias;

class EdicoesHistoricoController extends Controller
{
    public function __invoke($id)
    {
        $historico = (new LeadsCopias())->where('lead_id', $id)->orderByDesc('id')->get();

        return response()->json($historico);
    }
}
