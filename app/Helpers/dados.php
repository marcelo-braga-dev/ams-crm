<?php

if(!function_exists('getNomeCliente')) {
    function getNomeCliente($id) {
        return (new \App\Models\PedidosClientes())->getNomeCliente($id);
    }
}

if(!function_exists('getEnderecoCompleto')) {
    function getEnderecoCompleto($id) {
        return (new \App\Models\Enderecos())->getEnderecoCompleto($id);
    }
}
