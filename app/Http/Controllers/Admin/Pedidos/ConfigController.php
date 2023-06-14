<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Pedidos;
use App\Models\PedidosPrazos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ConfigController extends Controller
{
    public function index()
    {
        $cls = (new PedidosPrazos());

        $prazos['novo'] = $cls->getRevisar();
        $prazos['conferencia'] = $cls->getConferencia();
        $prazos['lancado'] = $cls->getLancamento();
        $prazos['boleto'] = $cls->getBoleto();
        $prazos['pagamento'] = $cls->getPagamento();
        $prazos['faturando'] = $cls->getFaturando();
        $prazos['acompanhamento'] = $cls->getAcompanhamento();
        $prazos['faturado'] = $cls->getFaturado();

        $coresPedidos = (new ConfigCores())->getPedidos();

        return Inertia::render('Admin/Pedidos/Config/Index',
            compact('prazos', 'coresPedidos'));
    }

    public function store(Request $request)
    {
        $prazos = (new PedidosPrazos());
        $prazos->setRevisar($request->novo);
        $prazos->setConferencia($request->conferencia);
        $prazos->setLancamento($request->lancado);
        $prazos->setBoleto($request->boleto);
        $prazos->setPagamento($request->pagamento);
        $prazos->setFaturando($request->faturando);
        $prazos->setFaturado($request->faturado);
        $prazos->setAcompanhamento($request->acompanhamento);

        modalSucesso('Atualizações Realizadas com Sucesso');
        return redirect()->route('admin.config.index');
    }

    public function atualizarCoresPedidos(Request $request)
    {
        // print_pre($request->all());

        (new ConfigCores())->reprovado($request->cor_reprovado);
        (new ConfigCores())->conferencia($request->cor_conferencia);
        (new ConfigCores())->lancado($request->cor_lancado);
        (new ConfigCores())->boleto($request->cor_nota);
        (new ConfigCores())->pagamento($request->cor_pagamento);
        (new ConfigCores())->faturamento($request->cor_faturamento);
        (new ConfigCores())->faturado($request->cor_faturado);
        (new ConfigCores())->acompanhamento($request->cor_acompanhamento);
        (new ConfigCores())->entregue($request->cor_entregue);
        (new ConfigCores())->cancelados($request->cor_cancelados);
    }
}
