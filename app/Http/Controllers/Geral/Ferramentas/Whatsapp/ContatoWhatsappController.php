<?php

namespace App\Http\Controllers\Geral\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class ContatoWhatsappController extends Controller
{
   public function index()
   {
        return Inertia::render('Geral/Ferramentas/Whatsapp/Contatos/Page');
   }

    public function getAll()
    {
        return response()->json(['all']);
   }
}
