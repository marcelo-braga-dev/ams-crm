<?php

namespace App\src\Usuarios;

class Usuarios
{
    public function cadastrar($request, TiposUsuarios $tiposUsuarios)
    {
        $tiposUsuarios->cadastrarUsuario($request);
    }
}
