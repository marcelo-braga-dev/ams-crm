<?php

namespace App\src\Usuarios\Funcoes;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

class Vendedores implements FuncoesUsuarios
{
    private string $funcao = 'consultor';

    public function getFuncao(): string
    {
        return $this->funcao;
    }

    function cadastrarUsuario($request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'senha' => 'required|string|max:255',
        ]);

        $user = (new User())
            ->create([
                'name' => $request->nome,
                'tipo' => $this->funcao,
                'email' => $request->email,
                'franquia_id' => $request->franquia,
                'setor_id' => $request->setor,
                // 'superior_id' => $request->superior ?? null,
                'password' => Hash::make($request->senha),
            ]);

        event(new Registered($user));
    }
}
