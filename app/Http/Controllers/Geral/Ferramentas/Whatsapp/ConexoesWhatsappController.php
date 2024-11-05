<?php

namespace App\Http\Controllers\Geral\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ConexoesWhatsappController extends Controller
{
   public function index()
   {
        return Inertia::render('Geral/Ferramentas/Whatsapp/Conexoes/Page');
   }
}
