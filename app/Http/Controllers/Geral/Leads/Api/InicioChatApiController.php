<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use App\Models\Lead\LeadContatoRealizado;
use App\Models\LeadsDEPREECATED\Leads;
use App\Services\Lead\UpdateStatusLeadService;
use Illuminate\Http\Request;

class InicioChatApiController extends Controller
{
   public function __invoke(Request $request)
   {
       $leadId = $request->input('lead_id');
       $telefoneId = $request->input('telefone_id');
       $origem = $request->input('origem');
       $meta = $request->input('meta');

       $lead = (new Lead())->newQuery()->find($leadId);
       $lead->update(['contato_data' => now()]);
       if ($lead->status === 'novo' || $lead->status === 'oportunidade') {
           (new UpdateStatusLeadService($leadId))->setConexaoProativaStatus($leadId);
           $lead->update(['status_data' => now()]);
       }

       (new LeadContatoRealizado())->store($leadId, $telefoneId, $origem, $meta);
   }
}
