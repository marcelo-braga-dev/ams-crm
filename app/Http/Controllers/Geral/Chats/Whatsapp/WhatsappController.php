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
        $urlFrontend = env('VITE_WHATSAPP', '');
        $urlBackend = env('VITE_WHATSAPP_API', '');
        $apiKey = env('VITE_WHATSAPP_API_TOKEN', '');

        return response()->json(compact('urlFrontend', 'urlBackend', 'apiKey'));
    }
}
