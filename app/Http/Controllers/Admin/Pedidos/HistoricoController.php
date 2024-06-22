<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoricoController extends Controller
{
    public function index(Request $request)
    {
        $setores = (new SetoresService())->setores();

        return Inertia::render('Admin/Pedidos/Historicos/Index',
            compact('setores'));
    }

    public function registros(Request $request)
    {
        $pedidos = (new Pedidos())->paginate($request['filtros']);

        return response()->json($pedidos);
    }
}
