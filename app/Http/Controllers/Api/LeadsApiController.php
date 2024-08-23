<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leads;
use Illuminate\Http\Request;

class LeadsApiController extends Controller
{
    public function cadastrar(Request $request)
    {
        (new Leads())->create($request, 5);
        return response()->json(['status' => 'success'], 200);
//        return redirect('https://intersolar.ams360.com.br/');
    }
}
