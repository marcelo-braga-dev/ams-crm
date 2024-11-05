<?php

namespace App\Http\Controllers\Admin\Pedidos\Quadros;

use App\Http\Controllers\Controller;
use App\Models\Franquias;
use App\Models\PedidosQuadros;
use App\Models\Setores;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidosQuadrosController extends Controller
{
    public function index()
    {
        $setorAtual = 1;
        $setores = (new Setores())->setores();

        $franquias = (new Franquias())->get();
        $quadros = (new PedidosQuadros())->get();

        return Inertia::render('Admin/Pedidos/Quadros/Index',
            compact('quadros', 'setores', 'setorAtual', 'franquias'));
    }
}
