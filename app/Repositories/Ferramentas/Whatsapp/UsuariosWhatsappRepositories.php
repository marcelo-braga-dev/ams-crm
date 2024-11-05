<?php

namespace App\Repositories\Ferramentas\Whatsapp;

use App\DTO\Ferramentas\Whatsapp\CadastrarUsuarioWhatsappDTO;
use App\Models\Ferramentas\Whatsapp\WhatsappUsuario;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuariosWhatsappRepositories
{
    public function create(Request $request)
    {
        $createDTO = CadastrarUsuarioWhatsappDTO::fromArray($request);

        try {
            DB::transaction(function () use ($createDTO) {
                WhatsappUsuario::create($createDTO->toArray());
            });
        } catch (\Exception $e) {
            throw new \DomainException('Falha no cadastro do usuário');
        }
    }

    public function getUsuarios()
    {
        return (new User)
            ->with('whatsapp')
            ->whereIn('id', supervisionados(id_usuario_atual()))
            ->orderBy('name')
            ->get();
    }

    public function ativar($id)
    {
        WhatsappUsuario::where('user_id', $id)
            ->update(['status' => 1]);
    }

    public function inativar($id)
    {
        WhatsappUsuario::where('user_id', $id)
            ->update(['status' => 0]);
    }

    public function credenciais()
    {
        return (new WhatsappUsuario)
            ->where('user_id', id_usuario_atual())
            ->first(['email', 'password', 'whatsapp_id as whatsappId']);
    }
}
