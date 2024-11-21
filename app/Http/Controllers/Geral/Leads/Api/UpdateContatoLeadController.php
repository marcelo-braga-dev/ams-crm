<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead\LeadTelefones;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UpdateContatoLeadController extends Controller
{
    public function __invoke(Request $request)
    {
        $telefoneId = $request->input('telefoneId');
        $contato = $request->input('contact');

        $whatsappId = $contato['data']['data']['contact']['id'];
        $foto = $contato['data']['data']['contact']['profilePicUrl'];

        DB::transaction(function () use ($telefoneId, $whatsappId, $foto) {
            LeadTelefones::find($telefoneId)
                ->update([
                    'whatsapp_id' => $whatsappId,
                    'whatsapp_picture' => $foto,
                    'status_whatsapp' => 2,
                ]);
        });

        return $request->all();
    }
}
