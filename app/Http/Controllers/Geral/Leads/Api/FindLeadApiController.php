<?php

namespace App\Http\Controllers\Geral\Leads\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Lead\LeadRepository;

class FindLeadApiController extends Controller
{
   public function __invoke($id)
   {
       $lead = (new LeadRepository())->find($id);

       return response()->json($lead);
   }
}
