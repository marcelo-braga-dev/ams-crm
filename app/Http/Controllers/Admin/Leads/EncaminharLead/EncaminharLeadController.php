<?php

namespace App\Http\Controllers\Admin\Leads\EncaminharLead;

use App\Http\Controllers\Controller;
use App\Models\Lead\Lead;
use Inertia\Inertia;

class EncaminharLeadController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Leads/Encaminhar/Page');
    }

    public function getLeads()
    {
        $leads = (new Lead())
            ->orderByDesc('id')
            ->paginate();

        return response()->json($leads);
    }
}
