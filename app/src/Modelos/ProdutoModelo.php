<?php

namespace App\src\Modelos;

class ProdutoModelo
{
    private int $id = 2;

    public function modelo(): int
    {
        return $this->id;
    }
}
