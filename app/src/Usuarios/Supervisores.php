<?php

namespace App\src\Usuarios;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

class Supervisores implements TiposUsuarios
{

    private string $tipo = 'supervisor';

    public function getFuncao(): string
    {
        return $this->tipo;
    }

    function cadastrarUsuario($request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'senha' => 'required|string|max:255',
        ]);

        $user = (new User())
            ->create([
                'name' => $request->nome,
                'tipo' => $this->tipo,
                'franquia_id' => $request->franquia,
                'email' => $request->email,
                'setor_id' => $request->setor,
                'password' => Hash::make($request->senha),
            ]);

        event(new Registered($user));
    }
}
