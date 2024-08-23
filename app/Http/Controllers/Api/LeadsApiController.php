<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use Illuminate\Http\Request;

class LeadsApiController extends Controller
{
    public function cadastrar(Request $request)
    {
        $setor = $request->setor ?? 1;;
        throw new \DomainException($request->fields['cnpj']['value']);
        (new Leads())->create($request, 1);
        return response()->json(['status' => 'success'], 200);
    }
}
