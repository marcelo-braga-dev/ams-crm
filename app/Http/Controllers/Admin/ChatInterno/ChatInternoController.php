<?php

namespace App\Http\Controllers\Admin\ChatInterno;

use App\Http\Controllers\Controller;
use App\Models\ChatInterno;
use App\Services\ChatInterno\MensagensChatInternoService;
use App\Services\Usuarios\UsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatInternoController extends Controller
{
    public function index()
    {
        $conversas = (new MensagensChatInternoService())->conversas();
        $pessoas = (new UsuariosService())->todos();

        return Inertia::render('Admin/ChatInterno/Index',
            compact('conversas', 'pessoas'));
    }

    public function store(Request $request)
    {
        (new ChatInterno())->create($request);

        return redirect()->back();
    }

    public function mensagens(Request $request)
    {
        $destinatarios = (new MensagensChatInternoService())
            ->mensagens($request->usuario, $request->destinatario);

        return $destinatarios;
    }
}
