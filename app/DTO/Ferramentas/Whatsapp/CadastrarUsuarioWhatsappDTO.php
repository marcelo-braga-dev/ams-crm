<?php

namespace App\DTO\Ferramentas\Whatsapp;

class CadastrarUsuarioWhatsappDTO
{
    private int $userId;
    private int $whatsappId;
    private string $email;
    private string $password;
    private ?int $conexaoId;

    public function __construct($userId, $whatsappId, $email, $password, $conexaoId)
    {
        $this->userId = $userId;
        $this->whatsappId = $whatsappId;
        $this->email = $email;
        $this->password = $password;
        $this->conexaoId = $conexaoId;
    }

    public static function fromArray($data): CadastrarUsuarioWhatsappDTO
    {
        return new self(
            $data['user_id'] ?? null,
            $data['whatsapp_id'] ?? null,
            $data['email'] ?? null,
            $data['password'] ?? null,
            $data['conexao_id'] ?? null,
        );
    }

    public function toArray(): array
    {
        return [
            'user_id' => $this->userId,
            'whatsapp_id' => $this->whatsappId,
            'status' => 1,
            'email' => $this->email,
            'password' => $this->password,
            'conexao_id' => $this->conexaoId,
        ];
    }
}
