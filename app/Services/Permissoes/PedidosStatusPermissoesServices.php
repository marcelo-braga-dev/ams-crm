<?php

namespace App\Services\Permissoes;

use App\Models\UsersPermissoes;
use App\src\Usuarios\Permissoes\PedidosStatusPermissoes;

class PedidosStatusPermissoesServices
{
    public function permissoesUsuario($id): array
    {
       $permissoes = (new UsersPermissoes())->permissoesUsuaioCategoria($id, (new PedidosStatusPermissoes())->permissoesStatusLeads());

       $status = [];
       foreach ($permissoes as $permissao) {
           $status[] = (new PedidosStatusPermissoes())->permissoesStatus($permissao);
       }

       return $status;
    }
}
