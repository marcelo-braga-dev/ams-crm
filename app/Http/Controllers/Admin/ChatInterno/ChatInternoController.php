<?php

namespace App\Http\Controllers\Admin\ChatInterno;

use App\Http\Controllers\Controller;
use App\Models\ChatInterno;
use App\Models\Setores;
use App\Models\User;
use App\Services\ChatInterno\MensagensChatInternoService;
use App\src\ChatInterno\CadastrarChatInterno;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatInternoController extends Controller
{
    public function index(Request $request)
    {
        $pessoas = (new User())->chatInterno();
        $setores = (new Setores())->get();
        $chatId = $request->input('chat_id');

        return Inertia::render('Admin/ChatInterno/Index',
            compact('pessoas', 'setores', 'chatId'));
    }

    public function store(Request $request)
    {
        (new CadastrarChatInterno())->salvar($request);
    }

    public function mensagens(Request $request)
    {
        $mensagens = (new MensagensChatInternoService())->mensagens($request->usuario, $request->destinatario, $request->categoria, $request->limit);
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
