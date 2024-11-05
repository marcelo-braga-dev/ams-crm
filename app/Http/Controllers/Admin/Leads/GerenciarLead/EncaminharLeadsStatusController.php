<?php

namespace App\Http\Controllers\Admin\Leads\GerenciarLead;

use App\Http\Controllers\Controller;
use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use Illuminate\Http\Request;

class EncaminharLeadsStatusController extends Controller
{
    public function __invoke(Request $request)
    {
        (new LeadsANTIGO())->encaminharStatus($request->user, $request->new_user, $request->status);
    }
}
