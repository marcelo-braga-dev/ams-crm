<?php

namespace App\Http\Controllers\Geral\Ferramentas\Voip;

use App\Http\Controllers\Controller;
use App\Services\Ferramentas\Voip\VoipService;
use Illuminate\Http\Request;

class VoipController extends Controller
{
    protected VoipService $asterisk;

    public function __construct(VoipService $asterisk)
    {
        $this->asterisk = $asterisk;
    }

    public function makeCall(Request $request)
    {
//        $validated = $request->validate([
//            'from' => 'required|string',
//            'to' => 'required|string',
//        ]);

        $from= $request->input('from');
        $to = $request->input('to');

        $response = $this->asterisk->originateCall($from, $to, 'from-interno', $to, 1);

        return response()->json(['message' => $response]);
    }

    public function info()
    {
        return response()->json($this->asterisk->getAsteriskInfo());
    }

    public function channels()
    {
        return response()->json($this->asterisk->getChannels());
    }
}
