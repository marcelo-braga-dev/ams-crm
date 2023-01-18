<?php

namespace App\Http\Controllers\Consultor\Leads;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadsController extends Controller
{
    public function index(Request $request)
    {
        $offset = $request->page ?? 0;
        $limit = 30;

        $naoAtendidosQuery = (new Leads())->newQuery()
            ->where('status', 'novo')
            ->where('users_id', auth()->id())
            ->offset($offset)->limit($limit)->get();

        $emAndamento = (new Leads())->newQuery()
            ->where('status', 'atendendo')
            ->offset($offset)->limit($limit)->get();

        $naoAtendidos = $naoAtendidosQuery->map(function ($dados) {
            return [
                'id' => "$dados->id",
                'empresa' => $dados->empresa,
                'data' => date('d/m/y H:i', strtotime($dados->status_data)),
                'obs' => $dados->status_anotacoes,
                'telefone' => $dados->telefone,
                'email' => $dados->email,
                'localidade' => $dados->localidade,
            ];
        });

        $offset += $limit;
        return Inertia::render('Consultor/Leads/Index',
            compact('naoAtendidos', 'emAndamento', 'offset'));
    }

    public function create()
    {
        return Inertia::render('Consultor/Leads/Create');
    }

    public function show($id)
    {
        $cliente = (new Leads())->newQuery()->find($id);
        return Inertia::render('Consultor/Leads/Show', compact('cliente'));
    }

    public function store(Request $request)
    {
        return redirect()->route('consultor.clientes.index');
    }
}
