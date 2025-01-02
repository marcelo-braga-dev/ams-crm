<?php

namespace App\Http\Controllers\Geral\Ferramentas\Voip;

use App\Http\Controllers\Controller;
use App\Models\Ferramentas\Voip\VoipCall;
use App\Models\Ferramentas\Voip\VoipGravacao;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StoreGravacaoVoipController extends Controller
{
    public function __invoke(Request $request)
    {
        Log::info('== VOID STORE API ==');
        foreach ($request->all() as $key => $value) {
            Log::info("$key => $value");
        }
        Log::info('====================');

        $validated = $request->validate([
            'phone_number' => 'required|string',
            'call_time' => 'required|date',
            'duration' => 'required|integer',
            'file_path' => 'required|string',
        ]);

        $callRecord = VoipGravacao::create($validated);

        return response()->json(['message' => 'Call record saved successfully', 'data' => $callRecord], 201);
    }
}
