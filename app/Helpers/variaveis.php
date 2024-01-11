<?php
if(!function_exists('modelo_usuario')) {
    function modelo_usuario():int {
        return (new \App\Models\User())->modeloPedidos();
    }
}
if(!function_exists('modelo_pedido')) {
    function modelo_pedido() {
        return  '';//auth()->id();
    }
}

if(!function_exists('modelo_setor')) {
    function modelo_setor($setor) {
        return  (new \App\Models\Setores())->getModelo($setor);
    }
}
