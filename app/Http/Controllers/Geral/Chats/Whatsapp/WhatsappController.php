<?php

namespace App\Http\Controllers\Geral\Chats\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsContatosRealizados;
use Illuminate\Http\Request;

class WhatsappController extends Controller
{
    public function armazenarEnvioMensagem(Request $request)
    {
        $mensagem = $request->mensagem['content'] ?? '';
        $origem = $request->input('origem');
        $leadId = $request->input('lead_id');
        $telefoneId = $request->input('lead_id');

//        (new LeadsContatosRealizados())->store($leadId, $telefoneId, $mensagem, $origem);
    }
}
