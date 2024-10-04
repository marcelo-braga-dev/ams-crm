<?php

namespace App\Http\Controllers\Geral\Chats\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsContatosRealizados;
use App\Repositories\Ferramentas\Whatsapp\UsuariosWhatsappRepositories;
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
        $urlFrontend = env('WHATSAPP_FRONTEND');
        $urlBackend = env('WHATSAPP_BACKEND');
        $apiKey = env('WHATSAPP_API_TOKEN');
//        $urlFrontend = "https://whatsapp.ams360crm.com.br";
//        $urlBackend = "https://api-whatsapp.ams360crm.com.br";
//        $apiKey = "0e29751e-46d9-4a8a-b279-0ac73cd2d63f";

        $credenciaisUsuario = (new UsuariosWhatsappRepositories())->credenciais();

        return response()->json(compact('urlFrontend', 'urlBackend', 'apiKey', 'credenciaisUsuario'));
    }
}
