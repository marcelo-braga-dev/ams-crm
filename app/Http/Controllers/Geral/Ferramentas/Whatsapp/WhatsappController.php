<?php

namespace App\Http\Controllers\Geral\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use App\Repositories\Ferramentas\Whatsapp\UsuariosWhatsappRepositories;
use App\Services\Ferramentas\Whatsapp\SettingsWatsappService;
use Inertia\Inertia;

class WhatsappController extends Controller
{
    public function index()
    {
        return Inertia::render('Geral/Ferramentas/Whatsapp/Index');
    }

    public function chaves()
    {
        $settings = (new SettingsWatsappService())->settings();

        return response()->json($settings);
    }
}
