<?php

namespace App\Http\Controllers\Geral\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use App\Repositories\Ferramentas\Whatsapp\UsuariosWhatsappRepositories;
use Inertia\Inertia;

class WhatsappController extends Controller
{
    public function index()
    {
        return Inertia::render('Geral/Ferramentas/Whatsapp/Index');
    }

    public function chaves()
    {
        //$urlFrontend = env('WHATSAPP_FRONTEND');
        //$urlBackend = env('WHATSAPP_BACKEND');
        //$apiKey = env('WHATSAPP_API_TOKEN');
        $urlFrontend = "https://whatsapp.ams360crm.com.br";
        $urlBackend = "https://api-whatsapp.ams360crm.com.br";
        $apiKey = "0e29751e-46d9-4a8a-b279-0ac73cd2d63f";

        $credenciaisUsuario = (new UsuariosWhatsappRepositories())->credenciais();

        return response()->json(compact('urlFrontend', 'urlBackend', 'apiKey', 'credenciaisUsuario'));
    }
}
