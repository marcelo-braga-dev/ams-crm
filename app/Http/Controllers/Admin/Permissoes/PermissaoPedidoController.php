<?php

namespace App\Http\Controllers\Admin\Permissoes;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PermissaoPedidoController extends Controller
{
   public function index()
   {
        return Inertia::render('Admin/Pedidos/Permissoes/Index');
   }
}
