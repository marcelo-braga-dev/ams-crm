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
        $urlFrontend = config('whaticket.frontend_url');
        $urlBackend = config('whaticket.backend_url');
        $apiKey = config('whaticket.api_token');
        $credenciaisUsuario = (new UsuariosWhatsappRepositories())->credenciais();

        return response()->json(compact('urlFrontend', 'urlBackend', 'apiKey', 'credenciaisUsuario'));
    }
}
