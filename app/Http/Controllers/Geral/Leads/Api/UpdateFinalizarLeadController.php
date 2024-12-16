<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Services\Ferramentas\Whatsapp\UpdateUserContactWhatsappService;
use App\src\Leads\StatusLeads\FinalizadoStatusLead;
use Illuminate\Http\Request;

class UpdateFinalizarLeadController extends Controller
{
    public function __invoke(Request $request)
    {
        (new FinalizadoStatusLead())->updateStatus($request->lead_id, $request->motivo);
        (new UpdateUserContactWhatsappService())->update($request->lead_id);

        modalSucesso('Lead finalizado com sucesso!');
    }
}
