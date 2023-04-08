<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Http\Controllers\Controller;
use App\Models\MetasVendas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ConsultoresController extends Controller
{
    public function index()
    {
        $metas = (new MetasVendas())->metasConsultores();
        $consultores = (new User())->getConsultores();

        return Inertia::render('Admin/MetasVendas/Consultores/Index',
            compact('consultores', 'metas'));
    }

    public function edit($id)
    {
        $meta = (new MetasVendas())->getMeta($id);
        $consultor = (new User())->get($id);

        return Inertia::render('Admin/MetasVendas/Consultores/Edit',
            compact('consultor', 'meta'));
    }

    public function update($id, Request $request)
    {
        (new MetasVendas())->createOrUpdate($id, $request->meta);

        return redirect()->route('admin.metas-vendas.consultores.index');
    }
}
