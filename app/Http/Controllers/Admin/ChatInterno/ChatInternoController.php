<?php

namespace App\Http\Controllers\Admin\ChatInterno;

use App\Http\Controllers\Controller;
use App\Models\ChatInterno;
use App\Models\User;
use App\Services\ChatInterno\MensagensChatInternoService;
use App\src\ChatInterno\Cadastrar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatInternoController extends Controller
{
    public function index()
    {
        $pessoas = (new User())->chatInterno();

        return Inertia::render('Admin/ChatInterno/Index',
            compact('pessoas'));
    }

    public function store(Request $request)
    {
        (new Cadastrar())->mensagem($request);

        return redirect()->back();
    }

    public function mensagens(Request $request)
    {
        $mensagens = (new MensagensChatInternoService())
            ->mensagens($request->usuario, $request->destinatario, $request->categoria);
        $chats = (new MensagensChatInternoService())->conversas();
        $chatAlerta = (new MensagensChatInternoService())->chatAlertas();

        return [
            'mensagens' => $mensagens,
            'chats' => $chats,
            'qtdAlertas' => $chatAlerta
        ];
    }

    public function excluirConversa(Request $request)
    {
        (new ChatInterno())->excluirConversa($request->idDestinatario);
    }

    public function excluirAviso(Request $request)
    {
        (new ChatInterno())->excluirAviso($request->id);
    }
}
