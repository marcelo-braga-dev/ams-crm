<?php
if (!function_exists('id_usuario_atual')) {
    function id_usuario_atual()
    {
        return auth()->id();
    }
}

if (!function_exists('setor_usuario_atual')) {
    function setor_usuario_atual()
    {
        return auth()->user()->setor;
    }
}

if (!function_exists('franquia_usuario_atual')) {
    function franquia_usuario_atual()
    {
        return auth()->user()->franquia;
    }
}

if (!function_exists('franquia_selecionada')) {
    function franquia_selecionada()
    {
        return session('franquiaSelecionada');
    }
}

if (!function_exists('funcao_usuario_atual')) {
    function funcao_usuario_atual()
    {
        return auth()->user()->tipo;
    }
}

if (!function_exists('is_admin')) {
    function is_admin(): bool
    {
        return auth()->user()->tipo === (new \App\src\Usuarios\Admins())->getFuncao();
    }
}

if (!function_exists('is_supervisor')) {
    function is_supervisor(): bool
    {
        return auth()->user()->tipo === (new \App\src\Usuarios\Supervisores())->getFuncao();
    }
}
