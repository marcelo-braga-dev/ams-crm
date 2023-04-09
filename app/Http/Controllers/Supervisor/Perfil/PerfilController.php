<?php

namespace App\Http\Controllers\Supervisor\Perfil;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Usuarios\DadosUsuariosService;
use App\src\Usuarios\AlterarSenha;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerfilController extends Controller
{
    public function edit()
    {
        $dados = (new DadosUsuariosService())->usuario(id_usuario_atual());

        return Inertia::render('Supervisor/Perfil/Edit', compact('dados'));
    }

    public function update($id, Request $request)
    {
        (new User)->setFoto($id, $request);

        modalSucesso("Dados atualizados com sucesso!");
        return redirect()->back();
    }

    public function alterarSenha($id, Request $request)
    {
        try {
            (new AlterarSenha())->alterar($request->senha_atual, $request->nova_senha, $request->confirmar_senha);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        return redirect()->back();
    }
}
