<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\src\Leads\StatusLeads\FinalizadoStatusLead;
use Illuminate\Http\Request;

class SetFinalizarLeadController extends Controller
{
    public function __invoke(Request $request)
    {
        (new FinalizadoStatusLead())->updateStatus($request->lead_id, $request->motivo);

        modalSucesso('Lead finalizado com sucesso!');
    }
}
