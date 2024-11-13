<?php

namespace App\Http\Controllers\Geral\Perfil;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UpdateSenhaUsuarioController extends Controller
{
    public function __invoke(Request $request)
    {
        if ($request->get('nova_senha') !== $request->get('confirmar_senha')) {
            modalErro('Nova senha e Confirmar Senha não coincidem!');
            return redirect()->back();
        }

        $request->validate([
            'nova_senha' => 'required|string|min:4',
        ], ['nova_senha.min' => 'A senha deve ter no mínimo 4 dígitos']);

        $user = Auth::user();
        $user->password = Hash::make($request->get('nova_senha'));
        $user->save();

        modalSucesso('Senha alterada com sucesso!');
        return redirect()->back();
    }
}
