<?php

namespace App\Http\Controllers\Admin\Leads\Consultores;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Leads\CardLeadsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CardsController extends Controller
{
    public function index(Request $request)
    {
        $leads = (new CardLeadsService())->getConsultor($request->id);
        $usuario = (new User())->get($request->id);

        return Inertia::render('Admin/Leads/Relatorios/Cards/Index',
            compact('leads', 'usuario'));
    }
}