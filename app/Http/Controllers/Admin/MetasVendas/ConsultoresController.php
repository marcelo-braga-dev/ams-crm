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
        $consultores = (new User())->getConsultores();
        $metasMensal = (new MetasVendas())->metasConsultores();
        $metasPeriodo = (new MetasVendas())->metasConsultoresPeriodo();

        return Inertia::render('Admin/MetasVendas/Consultores/Index',
            compact('consultores', 'metasMensal', 'metasPeriodo'));
    }

    public function edit($id)
    {
        $metas = (new MetasVendas())->getMeta($id);
        $consultor = (new User())->get($id);

        return Inertia::render('Admin/MetasVendas/Consultores/Edit',
            compact('consultor', 'metas'));
    }

    public function update($id, Request $request)
    {
        (new MetasVendas())->createOrUpdate($id, $request);

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->route('admin.metas-vendas.consultores.index');
    }
}
