<?php

namespace App\Http\Controllers\Geral\Ferramentas\Voip;

use App\Http\Controllers\Controller;
use App\Models\Ferramentas\Voip\VoipGravacao;

class GetGravacaoVoipController extends Controller
{
   public function __invoke()
   {
       $records = VoipGravacao::all();

       return response()->json($records);
   }
}
