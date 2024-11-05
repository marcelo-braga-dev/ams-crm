<?php

namespace App\src\Usuarios;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AlterarSenha
{
    public function alterar($atual, $novaSenha, $confirmarSenha)
    {
        if (!(Hash::check($atual, Auth::user()->password))) {
            throw new \DomainException('Senha atual inválida!');
        }

        if ($novaSenha !==  $confirmarSenha) {
            throw new \DomainException('Nova senha e Confirmar Senha não coincidem!');
        }

        if (strlen($novaSenha) < 4) {
            throw new \DomainException('A senha deve ter no mínimo 4 dígitos');
        }

        $user = Auth::user();
        $user->password = Hash::make($novaSenha);
        $user->save();

        modalSucesso('Senha alterada com sucesso!');
        return redirect()->back();
    }
}
