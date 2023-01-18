<?php

namespace App\src\Usuarios;

interface TiposUsuarios
{
    function getTipo(): string;

    function cadastrarUsuario($request);
}
