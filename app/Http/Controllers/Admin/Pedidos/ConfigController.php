<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\PedidosPrazos;
use Illuminate\Http\Request;
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
        $prazos['faturado'] = $cls->getFaturado();

        return Inertia::render('Admin/Pedidos/Config/Index', compact('prazos'));
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

        modalSucesso('Atualizações Realizadas com Sucesso');
        return redirect()->route('admin.config.index');
    }
}
