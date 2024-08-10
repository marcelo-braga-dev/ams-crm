<?php

namespace App\Http\Controllers\Admin\Ferramentas\Tarefas;

use App\Http\Controllers\Controller;
use App\Models\FerramentasTarefas;
use App\Models\FerramentasTarefasItens;
use App\Models\FerramentasTarefasUsuarios;
use App\Models\Setores;
use App\Models\User;
use App\Services\Dev\DadosCardService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaferasController extends Controller
{
    public function index()
    {
        $registros = (new FerramentasTarefas())->getStatus();

        return Inertia::render('Admin/Ferramentas/Tarefas/Index', compact('registros'));
    }

    public function create()
    {
        $usuarios = (new User())->usuarios(true);
        $usuarioAtual = id_usuario_atual();

        return Inertia::render('Admin/Ferramentas/Tarefas/Create',
            compact('usuarios', 'usuarioAtual'));
    }

    public function store(Request $request)
    {
        (new FerramentasTarefas())->create($request);

        modalSucesso('Tarefa cadastrada com sucesso!');
        return redirect()->route('admin.ferramentas.tarefas.index');
    }

    public function edit($id)
    {
        $usuarios = (new User())->usuarios(true);
        $usuarioAtual = id_usuario_atual();

        $dados = (new FerramentasTarefas())->find($id);
        $tarefas = (new FerramentasTarefasItens())->get($id);
//        print_pre($tarefas);

        return Inertia::render('Admin/Ferramentas/Tarefas/Edit',
            compact('usuarios', 'dados', 'tarefas', 'usuarioAtual'));
    }

    public function update($id, Request $request)
    {
        (new FerramentasTarefas())->atualizar($id, $request);
        (new FerramentasTarefasUsuarios())->atualizar($id, $request->usuarios);
        (new FerramentasTarefasItens())->atualizar($id, $request->tarefas);

        modalSucesso('Dados Atualizados com sucesso!');
    }

    public function alterarStatusItem(Request $request)
    {
        (new FerramentasTarefasItens())->alterarStatus($request->id, $request->status);

        modalSucesso('Status alterado com sucesso!');
    }

    public function destroy($id)
    {
        (new FerramentasTarefas())->remove($id);

        modalSucesso('Tarefa removida com sucesso!');
        return redirect()->route('admin.ferramentas.tarefas.index');
    }

    public function excluirItem($id)
    {
        (new FerramentasTarefasItens())->remove($id);

        modalSucesso('Item removida com sucesso!');
        return redirect()->back();
    }
}
