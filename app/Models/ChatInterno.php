<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatInterno extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'destinatario',
        'status',
        'mensagem',
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'destinatario' => $dados->destinatario,
                'mensagem' => $dados->mensagem,
                'status' => 'novo'
            ]);
    }

    public function getMensagens($usuario = null, $destinatarios)
    {
        $usuario = $usuario ?? id_usuario_atual();

        return $this->newQuery()
            ->where([
                ['users_id', $usuario], ['destinatario', $destinatarios]
            ])
            ->orWhere([
                ['users_id', $destinatarios], ['destinatario', $usuario]
            ])
            ->get();
    }

    public function getDestinatarios()
    {
        $usuario = id_usuario_atual();

        return $this->newQuery()
            ->where('users_id', $usuario)
            ->orWhere('destinatario', $usuario)
            ->get();
    }
}
