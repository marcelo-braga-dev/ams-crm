<?php

namespace App\Http\Controllers\Admin\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class LeadsController extends Controller
{
    public function index()
    {
        $status = (new Leads())->relatorioLeads();

        $sdr = (new User())->usuariosSdr();

        return Inertia::render('Admin/Dashboard/Leads/Index', compact('status', 'sdr'));
    }

    public function relatorios(Request $request)
    {
        $sdr = (new Leads())->relatorioUsuarios($request->id);

        return response()->json(['sdr' => $sdr]);
    }
}
