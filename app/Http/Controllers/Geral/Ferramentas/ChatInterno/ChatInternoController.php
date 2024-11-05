<?php

namespace App\Http\Controllers\Geral\Ferramentas\ChatInterno;

use App\Events\ChatInterno\ChatInternoEvent;
use App\Events\ChatInterno\MessageSent;
use App\Http\Controllers\Controller;
use App\Models\Ferramentas\ChatInterno;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatInternoController extends Controller
{
    public function index()
    {
        return Inertia::render('Geral/Ferramentas/ChatInterno/Page');
    }

    public function sendMessage(Request $request)
    {
        $message = ChatInterno::create([
            'chat_id' => $request->input('chat_id'),
            'user_id' => $request->input('user_id'),
            'content' => $request->input('content'),
            'recipient_id' => $request->input('recipient_id'),
        ]);

        event(new ChatInternoEvent($message->recipient_id, $message->content));

        return response()->json(['status' => 'Message Sent!']);
    }
}
