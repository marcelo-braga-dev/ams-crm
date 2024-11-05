<?php

namespace App\Http\Controllers\Geral;

use App\Http\Controllers\Controller;
use App\Models\Pins;
use Illuminate\Http\Request;

class PinsController extends Controller
{
    public function pedidos(Request $request)
    {
        (new Pins())->createPedido($request->pedido_id);
    }

    public function leads(Request $request)
    {
        (new Pins())->createLead($request->lead_id);
    }
}
