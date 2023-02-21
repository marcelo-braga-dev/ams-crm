<?php
if(!function_exists('id_usuario_atual')) {
    function id_usuario_atual() {
        return auth()->id();
    }
}

if(!function_exists('setor_usuario_atual')) {
    function setor_usuario_atual() {
        return auth()->user()->setor;
    }
}
