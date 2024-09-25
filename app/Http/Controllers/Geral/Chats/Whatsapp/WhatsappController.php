<?php

namespace App\Http\Controllers\Geral\Chats\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsContatosRealizados;
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

    public function chaves()
    {
        $urlFrontend = env('WHATSAPP_FRONTEND', '');
        $urlBackend = env('WHATSAPP_BACKEND', '');
        $apiKey = env('WHATSAPP_API_TOKEN', '');
        $userId = id_usuario_atual();

        return response()->json(compact('urlFrontend', 'urlBackend', 'apiKey', 'userId'));
    }
}
