<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use Illuminate\Http\Request;

class LeadsApiController extends Controller
{
    public function cadastrar(Request $request)
    {
        $setor = $request->setor ?? 1;
        (new Leads())->create($request, $setor);
        return response()->json(['status' => 'success'], 200);
    }
}
