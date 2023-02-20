<?php

if (!function_exists('getNomeCliente')) {
    function getNomeCliente($id)
    {
        return (new \App\Models\PedidosClientes())->getNomeCliente($id);
    }
}

if (!function_exists('getEnderecoCompleto')) {
    function getEnderecoCompleto($id)
    {
        return (new \App\Models\Enderecos())->getEnderecoCompleto($id);
    }
}

if (!function_exists('converterTelefone')) {
    function converterTelefone($dados = '')
    {
        $res = $dados;
        $dados = preg_replace("/\D/","", $dados);
        $qtd = mb_strlen($dados);

        if ($qtd == 13) {
            $res = substr_replace($dados, '-', -4, 0);
            $res = substr_replace($res, ') ', -10, 0);
            $res = '+' . substr_replace($res, ' (', -14, 0);
        }

        if ($qtd == 12) {
            $res = substr_replace($dados, '-', -4, 0);
            $res = substr_replace($res, ') ', -9, 0);
            $res = '+' . substr_replace($res, ' (', -13, 0);
        }

        if ($qtd == 11) {
            $res = substr_replace($dados, '-', -4, 0);
            $res = substr_replace($res, ') ', -10, 0);
            $res = '+55 ' . substr_replace($res, ' (', -14, 0);
        }

        if ($qtd == 10) {
            $res = substr_replace($dados, '-', -4, 0);
            $res = substr_replace($res, ') ', -9, 0);
            $res = '+55 ' . substr_replace($res, ' (', -14, 0);
        }

        return $res;
    }
}
