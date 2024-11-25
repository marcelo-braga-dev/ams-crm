<?php

namespace App\Http\Controllers\Geral\Perfil;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UpdateSenhaUsuarioController extends Controller
{
    public function __invoke(Request $request)
    {
        $userId = $request->user_id ?? id_usuario_atual();

        if ($request->get('nova_senha') !== $request->get('confirmar_senha')) {
            modalErro('Nova senha e Confirmar Senha não coincidem!');
            return redirect()->back();
        }

        $request->validate([
            'nova_senha' => 'required|string|min:4',
        ], ['nova_senha.min' => 'A senha deve ter no mínimo 4 dígitos']);

        $user = (new User)->find($userId);
        $user->password = Hash::make($request->get('nova_senha'));
        $user->save();

        modalSucesso('Senha alterada com sucesso!');
        return redirect()->back();
    }
}
