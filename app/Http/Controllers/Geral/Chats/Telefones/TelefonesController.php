<?php

namespace App\Http\Controllers\Geral\Chats\Telefones;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadTelefones;
use Illuminate\Http\Request;

class TelefonesController extends Controller
{
    public function alterarStatus($id, Request $request)
    {
        (new LeadTelefones())->alterarStatusTelefone($id, $request->status);
    }
}
