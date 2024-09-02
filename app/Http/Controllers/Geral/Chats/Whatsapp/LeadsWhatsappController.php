<?php

namespace App\Http\Controllers\Geral\Chats\Whatsapp;

use App\Http\Controllers\Controller;
use App\Models\Leads\LeadsTelefones;

class LeadsWhatsappController extends Controller
{
    public function ativarNumeroWhatsapp($id)
    {
        (new LeadsTelefones())->ativar($id);
    }
    public function inativarNumeroWhatsapp($id)
    {
        (new LeadsTelefones())->inativar($id);
    }
}
