<?php

namespace App\Http\Controllers\Geral\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadTelefones;

class LeadsWhatsappController extends Controller
{
    public function ativarNumeroWhatsapp($id)
    {
        (new LeadTelefones())->ativar($id);
    }
    public function inativarNumeroWhatsapp($numero)
    {
        (new LeadTelefones())->inativar($numero);
    }
}
