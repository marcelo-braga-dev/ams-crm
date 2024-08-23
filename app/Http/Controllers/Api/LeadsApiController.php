<?php

namespace App\Http\Controllers\Api;

use App\Events\ChatInternoNovaMensagemRecebida;
use App\Http\Controllers\Controller;
use App\Models\Leads;
use Illuminate\Http\Request;

class LeadsApiController extends Controller
{
    public function cadastrar(Request $request)
    {
        $setor = $request->setor ?? 1;
        throw new \DomainException($request->fields['cnpj']['title']);

        return response()->json(['status' => 'success'], 200);
    }
}
