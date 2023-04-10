<?php

namespace App\src\ChatInterno\Categorias;

class Chat
{
    private $categoria = 'chat';
    public function categoria(): string
    {
        return $this->categoria;
    }
}
