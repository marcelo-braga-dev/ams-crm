<?php
if(!function_exists('id_usuario_atual')) {
    function id_usuario_atual() {
        return auth()->id();
    }
}
