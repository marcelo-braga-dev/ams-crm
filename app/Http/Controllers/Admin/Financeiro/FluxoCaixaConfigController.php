<?php

namespace App\Http\Controllers\Admin\Financeiro;

use App\Http\Controllers\Controller;
use App\Models\FluxoCaixasConfig;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FluxoCaixaConfigController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Financeiro/Config/Index');
    }

    public function store(Request $request)
    {
        try {
            (new FluxoCaixasConfig())->create($request);

            modalSucesso('Dados atualizados com sucesso!');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
        return redirect()->back();
    }

    public function update($id, Request $request)
    {
        try {
            (new FluxoCaixasConfig())->atualizar($request->id, $request);

            modalSucesso('Dados atualizado com sucesso!');
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }
        return redirect()->back();
    }

    public function destroy($id)
    {
        try {
            (new FluxoCaixasConfig())->remover($id);
        } catch (\DomainException $exception) {
            modalErro($exception->getMessage());
        }

        modalSucesso('Dado removido com sucesso!');
        return redirect()->back();
    }

    public function registros()
    {
        $bancos = (new FluxoCaixasConfig())->getBancos();
        $empresas = (new FluxoCaixasConfig())->getEmpresas();
        $fornecedores = (new FluxoCaixasConfig())->getFornecedores();

        return response()->json(compact('bancos', 'empresas', 'fornecedores'));
    }
}
