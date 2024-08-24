<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatInternoNovaMensagemRecebida  implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $mensagem;
    public $destinatarioId;
    public $remetente;
    public $remetenteFoto;
    public $remetenteId;

    /**
     * Create a new event instance.
     */
    public function __construct($destinatarioId, $mensagem)
    {
        $remetente = (new User())->find(id_usuario_atual());

        $this->mensagem = $mensagem;
        $this->destinatarioId = $destinatarioId;
        $this->remetente = $remetente->name;
        $this->remetenteFoto = url_arquivos($remetente->foto);
        $this->remetenteId = $remetente->id;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [new PrivateChannel('chat.' . $this->destinatarioId)];
    }

    public function broadcastAs()
    {
        return 'message.sent';
    }
}
