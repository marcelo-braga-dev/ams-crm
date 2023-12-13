<?php

namespace App\src\Usuarios;

interface TiposUsuarios
{
    function getFuncao(): string;

    function cadastrarUsuario($request);
}
