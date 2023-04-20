<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Services\Dashboard\Vendas\VendasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendasController extends Controller
{
    public function index()
    {
        $metaVendas = (new VendasService())->metaVendas();

        return Inertia::render('Admin/Dashboard/Vendas/Index',
        compact('metaVendas'));
    }
}
