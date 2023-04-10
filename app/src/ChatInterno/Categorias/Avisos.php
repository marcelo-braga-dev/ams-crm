<?php

namespace App\src\ChatInterno\Categorias;

class Avisos
{
    private $categoria = 'aviso';
    public function categoria(): string
    {
        return $this->categoria;
    }
}
