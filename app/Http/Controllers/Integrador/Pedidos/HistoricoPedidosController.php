<?php

namespace App\Http\Controllers\Integrador\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricoPedidosController extends Controller
{
    public function index()
    {
        return Inertia::render('Integrador/Pedidos/Historico/Index');
    }

    public function getHistorico(Request $request)
    {
        $pedidos = (new Pedidos())->paginate($request['filtros'], auth()->user()->cnpj);

       return response()->json($pedidos);
   }
}
