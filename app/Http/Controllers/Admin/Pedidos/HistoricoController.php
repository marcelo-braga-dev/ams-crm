<?php

namespace App\Http\Controllers\Admin\Pedidos;

use App\Http\Controllers\Controller;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Services\Pedidos\PedidosService;
use App\Services\Setores\SetoresService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HistoricoController extends Controller
{
    public function index(Request $request)
    {
        $dadosSetor = session('sessaoSetor');
        if ($request->setor == 'todos') {
            session(['sessaoSetor' => null]);
        }
        if ($request->setor) {
            $setorAtual = $request->setor;
            $dadosSetor = (new Setores())->find($setorAtual);
            session(['sessaoSetor' => $dadosSetor]);
        }

        $setorAtual = session('sessaoSetor')['id'] ?? null;

        $pedidos = (new PedidosService())->todosPedidos($setorAtual);
        $setores = (new SetoresService())->setores();

        return Inertia::render('Admin/Pedidos/Historicos/Index',
            compact('pedidos', 'setores', 'setorAtual'));
    }
}
