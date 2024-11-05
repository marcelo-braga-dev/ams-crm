<?php

namespace App\Http\Controllers\Admin\Chats;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WhatsappController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Chats/Whatsapp/Index');
    }
}
