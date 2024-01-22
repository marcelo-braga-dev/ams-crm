<?php

namespace App\Http\Controllers\Consultor\ChatInterno;

use App\Http\Controllers\Controller;
use App\Models\ChatInterno;
use App\Services\ChatInterno\MensagensChatInternoService;
use App\Services\Usuarios\UsuariosService;
use App\src\ChatInterno\CadastrarChatInterno;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatInternoController extends Controller
{
    public function index()
    {
        $conversas = (new MensagensChatInternoService())->conversas();
        $pessoas = (new UsuariosService())->ativos(id_usuario_atual(), null, true);
        $setores = [];

        return Inertia::render('Consultor/ChatInterno/Index',
            compact('conversas', 'pessoas', 'setores'));
    }

    public function store(Request $request)
    {
        (new CadastrarChatInterno())->salvar($request);

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
}
