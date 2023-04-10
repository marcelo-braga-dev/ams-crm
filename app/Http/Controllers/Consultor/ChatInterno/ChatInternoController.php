<?php

namespace App\Http\Controllers\Consultor\ChatInterno;

use App\Http\Controllers\Controller;
use App\Models\ChatInterno;
use App\Services\ChatInterno\MensagensChatInternoService;
use App\Services\Usuarios\UsuariosService;
use App\src\ChatInterno\Cadastrar;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatInternoController extends Controller
{
    public function index()
    {
        $conversas = (new MensagensChatInternoService())->conversas();
        $pessoas = (new UsuariosService())->ativos(id_usuario_atual(), setor_usuario_atual(), true);

        return Inertia::render('Consultor/ChatInterno/Index',
            compact('conversas', 'pessoas'));
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
}
