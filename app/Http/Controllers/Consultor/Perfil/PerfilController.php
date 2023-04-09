<?php

namespace App\Http\Controllers\Consultor\Perfil;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Usuarios\DadosUsuariosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerfilController extends Controller
{
    public function index()
    {
        $dados = (new DadosUsuariosService())->usuario(id_usuario_atual());

        return Inertia::render('Consultor/Perfil/Show', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new User)->setFoto($id, $request);

        modalSucesso("Dados atualizados com sucesso!");
        return redirect()->back();
    }
}
