<?php

namespace App\Http\Controllers\Geral\Leads;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadStatusHistoricos;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\Pedidos;
use App\Models\User;
use App\Models\UsersPermissoes;
use App\Repositories\Lead\LeadRepository;
use App\Services\Leads\HistoricoDadosService;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function update($id, Request $request)
    {
        try {
            (new LeadsANTIGO())->atualizar($id, $request);
            modalSucesso('Dados Atualizados com sucesso!');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
    }
}
