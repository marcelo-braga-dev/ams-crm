<?php

namespace App\Services\Financeiro\Salarios;

use App\Models\MetasVendas;
use App\Models\Pedidos;
use App\Models\User;

class SalariosService
{
    public function equipe($id, $mes, $ano)
    {
        $idSubs = (new User())->getIdsSubordinados(true, $id);
        $vendasEquipe = 0;
        $metasEquipe = 0;

        if (count($idSubs) > 1) foreach ($idSubs as $idSub) {
            $vendasEquipe += ((new Pedidos())->getVendasMesUsuario($idSub, $mes, $ano))->vendas;
            $metasEquipe += (new MetasVendas())->getMetaMes($idSub, $mes, $ano);
        }
        return [$vendasEquipe, $metasEquipe];
    }
}
