<?php

namespace App\Http\Controllers\Integrador\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\ConfigCores;
use App\Models\Pedidos\Instalacoes\PedidosInstalacoes;
use App\Services\Pedidos\CardDadosService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosController extends Controller
{
    public function index(Request $request)
    {
        $pedidos = (new CardDadosService())->getCards(null, null, null, auth()->user()->cnpj);
        $coresAbas = (new ConfigCores())->getPedidos();
        $instalacao = (new PedidosInstalacoes)->getPedidosCards();

        $goCard = $request->id_card;

        return Inertia::render('Integrador/Pedidos/Index/Index',
            compact('pedidos', 'coresAbas', 'goCard', 'instalacao'));
    }
}
