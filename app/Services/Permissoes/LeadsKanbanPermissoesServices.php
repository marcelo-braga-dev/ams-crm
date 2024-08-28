<?php

namespace App\Services\Permissoes;

use App\Models\UsersPermissoes;
use App\src\Usuarios\Permissoes\LeadsKanban;

class LeadsKanbanPermissoesServices
{
    public function permissoesUsuario($id): array
    {
       $permissoes = (new UsersPermissoes())->permissoesUsuaioCategoria($id, (new LeadsKanban())->permissoesStatusLeads());

       $status = [];
       foreach ($permissoes as $permissao) {
           $status[] = (new LeadsKanban())->permissoesStatus($permissao);
       }

       return $status;
    }
}
