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

        $dados['cnpj'] = $request->fields['cnpj']['value'] ?? null;
        $dados['nome'] = $request->fields['nome']['value'] ?? null;
        $dados['razao_social'] = $request->fields['razao_social']['value'] ?? null;
        $dados['telefones'][] = $request->fields['telefone']['value'] ?? null;
        (new ChatInternoNovaMensagemRecebida(1, $request->fields))
        (new Leads())->create($dados, 1);

        return response()->json(['status' => 'success'], 200);
    }
}
