<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use Illuminate\Http\Request;

class UpdadeStatusLeadController extends Controller
{
    public function __invoke($id, Request $request)
    {
        Lead::find($id)
            ->update(['status' => $request->status]);

        modalSucesso('Status atualizado com sucesso!');
        return redirect()->back();
    }
}
