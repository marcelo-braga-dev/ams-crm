<?php

namespace App\Http\Controllers\Admin\Config;

use App\Http\Controllers\Controller;
use App\Models\PlataformasDados;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlataformaController extends Controller
{
    public function index()
    {
        $registros = (new PlataformasDados)->get();

        return Inertia::render('Admin/Config/Plataforma/Index', compact('registros'));
    }

    public function update($id, Request $request)
    {
        (new PlataformasDados())->atualizar($request);

        modalSucesso('Dados atualizados com sucesso!');
        return redirect()->back();
    }
}
