<?php

namespace App\Services\Ferramentas\Whatsapp;

use App\Repositories\Ferramentas\Whatsapp\UsuariosWhatsappRepositories;

class SettingsWatsappService
{
    public function settings()
    {
        $urlFrontend = config('whaticket.frontend_url');
        $urlBackend = config('whaticket.backend_url');
        $apiKey = config('whaticket.api_token');
        $credenciaisUsuario = (new UsuariosWhatsappRepositories())->credenciais();

        return compact('urlFrontend', 'urlBackend', 'apiKey', 'credenciaisUsuario');
    }
}
