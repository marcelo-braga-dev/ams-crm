<?php

namespace App\Http\Controllers\Admin\Leads\GerenciarLead;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use Illuminate\Http\Request;

class GetLeadsStatusConsultorController extends Controller
{
    public function __invoke(Request $request)
    {
        $leads = (new Lead())->newQuery()
            ->where('user_id', $request->consultor)
            ->where('status', $request->status)
            ->orderByDesc('status_data')
            ->get();

        return response()->json($leads);
    }
}
