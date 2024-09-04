<?php

namespace App\Services\Leads;

use App\Models\LeadsEncaminhados;
use App\Models\User;

class SequenciaEnvioLeadsService
{
    public function proximo($setor)
    {
        $ultimo = (new LeadsEncaminhados())->ultimoVendedorEnviado($setor);

        $vendedores = (new User())->usuariosRecebeLeadsId($setor);

        if (count($vendedores) < 1) throw new \DomainException('Não há consultores(as) para enviar o cliente.');

        $idEnviar = $vendedores[0];

        for ($i = 0; $i < count($vendedores); $i++) {
            if (($ultimo) < ($vendedores[$i])) {
                $idEnviar = $vendedores[$i];
                break;
            }
        }

        return $idEnviar;
    }

    public function lista($setor)
    {
        $nomes = (new User())->getNomes();
        $items = (new User())->usuariosRecebeLeadsId($setor);

        $res = [];
        foreach ($items as $item) {
            $res[] = ['id' => $item, 'nome' => $nomes[$item] ?? ''];
        }
        return $res;
    }
}
