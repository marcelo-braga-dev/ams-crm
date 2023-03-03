<?php

namespace App\Services\ChatInterno;

use App\Models\ChatInterno;

class NotificacoesChatInterno
{
    public function qtdNovas()
    {
        return (new ChatInterno())->countMensagenNovas(id_usuario_atual());
    }
}
