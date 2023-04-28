<?php

namespace App\Http\Controllers\Admin\MetasVendas;

use App\Http\Controllers\Controller;
use App\Models\Comissoes;
use App\Models\MetasVendas;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComissoesController extends Controller
{
    public function index()
    {
        $consultores = (new User())->getConsultores();
        $comissoes = (new Comissoes())->comissaoConsultores();

        return Inertia::render('Admin/MetasVendas/Comissoes/Index',
            compact('consultores', 'comissoes'));
    }

    public function edit($id)
    {
        $dados = (new Comissoes())->comissao($id);
        $consultor = (new User())->get($id);

        return Inertia::render('Admin/MetasVendas/Comissoes/Edit',
            compact('consultor', 'dados'));
    }

    public function update($id, Request $request)
    {
        (new Comissoes)->createOrUpdate($id, $request);

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->route('admin.metas-vendas.comissoes.index');
    }
}
