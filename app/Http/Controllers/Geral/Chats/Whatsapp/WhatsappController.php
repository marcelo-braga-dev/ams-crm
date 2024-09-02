<?php

namespace App\Http\Controllers\Geral\Chats\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsContatosRealizados;
use Illuminate\Http\Request;

class WhatsappController extends Controller
{
    public function enviadoMensagem(Request $request)
    {
        $leadId = $request->input('lead_id');
        $telefoneId = $request->input('telefone_id');
        $origem = $request->input('origem');
        $meta = $request->input('meta');

        (new LeadsContatosRealizados())->store($leadId, $telefoneId, $origem, $meta);
    }
}
