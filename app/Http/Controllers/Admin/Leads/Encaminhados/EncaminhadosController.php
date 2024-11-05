<?php

namespace App\Http\Controllers\Admin\Leads\Encaminhados;

use App\Http\Controllers\Controller;
use App\Models\LeadsEncaminhados;
use App\Services\Leads\SequenciaEnvioLeadsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EncaminhadosController extends Controller
{
    public function index()
    {
        $proximo = (new SequenciaEnvioLeadsService())->proximo(1);
        $listaEnvio = (new SequenciaEnvioLeadsService())->lista(1);
        $historicos = (new LeadsEncaminhados())->historico();

        return Inertia::render('Admin/Leads/Encaminhados/Index',
            compact('historicos', 'listaEnvio', 'proximo'));
    }
}
