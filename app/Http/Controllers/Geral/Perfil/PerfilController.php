<?php

namespace App\Http\Controllers\Geral\Perfil;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerfilController extends Controller
{
    public function index()
    {
        $dados = (new User())->get(id_usuario_atual());

        return Inertia::render('Geral/Perfil/Index', compact('dados'));
    }

    public function atualizarFoto($id, Request $request)
    {
        (new User)->setFoto($id, $request);

        modalSucesso("Dados atualizados com sucesso!");
        return redirect()->back();
    }
}
