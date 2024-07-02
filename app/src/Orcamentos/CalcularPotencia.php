<?php

namespace App\src\Orcamentos;

class CalcularPotencia
{
    public function calcular($dados)
    {
        if ($dados->tipoCalculo == 'kwp') return $dados->potencia;

        return $dados->potencia / 100;
    }
}
