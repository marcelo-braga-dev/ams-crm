<?php

namespace App\Http\Controllers\Geral\Ferramentas\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsTelefones;

class LeadsWhatsappController extends Controller
{
    public function ativarNumeroWhatsapp($id)
    {
        (new LeadsTelefones())->ativar($id);
    }
    public function inativarNumeroWhatsapp($numero)
    {
        (new LeadsTelefones())->inativar($numero);
    }
}
