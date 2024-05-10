<?php

use App\Models\UsersHierarquias;

if (!function_exists('id_usuario_atual')) {
    function id_usuario_atual()
    {
        return auth()->id();
    }
}

if (!function_exists('setor_usuario_atual')) {
    function setor_usuario_atual()
    {
        return auth()->user()->setor_id;
    }
}

if (!function_exists('franquia_usuario_atual')) {
    function franquia_usuario_atual()
    {
        return auth()->user()->franquia_id;
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
        return auth()->user()->funcao_id;
    }
}

if (!function_exists('is_financeiro')) {
    function is_financeiro(): bool
    {
        return auth()->user()->is_financeiro;
    }
}

if (!function_exists('is_sdr')) {
    function is_sdr()
    {
        return (new \App\Models\UsersPermissoes())->isSrd(id_usuario_atual());
    }
}

if (!function_exists('is_emite_pedido')) {
    function is_emite_pedido()
    {
        return (new \App\Models\UsersPermissoes())->isEmitePedido(id_usuario_atual());
    }
}

if (!function_exists('is_admin')) {
    function is_admin(): bool
    {
        return auth()->user()->is_admin;
    }
}

if (!function_exists('supervisionados')) {
    function supervisionados($id)
    {
        return (new UsersHierarquias())->supervisionados($id);
    }
}


if (!function_exists('is_supervisor')) {
    function is_supervisor()
    {
        throw new DomainException();
        // return auth()->user()->tipo === (new \App\src\Usuarios\Funcoes\Supervisores())->getFuncao();
    }
}
