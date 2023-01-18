<?php

namespace App\Http\Controllers\Consultor\Perfil;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SenhaController extends Controller
{
    public function edit()
    {
        return Inertia::render('Consultor/Perfil/Senha/Edit');
    }

    public function update($id, Request $request)
    {
        if (!(Hash::check($request->get('senha_atual'), Auth::user()->password))) {

            modalErro('Senha atual inválida!');
            return redirect()->back();
        }

        if ($request->get('nova_senha') !==  $request->get('confirmar_senha')) {

            modalErro('Nova senha e Confirmar Senha não coincidem!');
            return redirect()->back();
        }

        $request->validate([
            'senha_atual' => 'required',
            'nova_senha' => 'required|string|min:4',
        ], ['nova_senha.min' => 'A senha deve ter no mínimo 4 dígitos']);

        $user = Auth::user();
        $user->password = Hash::make($request->get('nova_senha'));
        $user->save();

        modalSucesso('Senha alterada com sucesso!');
        return redirect()->back();
    }
}
