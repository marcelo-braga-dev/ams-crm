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
}
