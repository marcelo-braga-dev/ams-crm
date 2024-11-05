<?php

namespace App\Services\Setores;

use App\Models\Setores;

class SetoresService
{
    public function setores()
    {
        return (new Setores())->get();
    }
}
