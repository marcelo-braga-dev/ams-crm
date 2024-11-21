<?php

namespace App\Services\Ferramentas\Whatsapp;

use App\Models\Ferramentas\Whatsapp\WhatsappUsuario;
use App\Models\Lead\LeadTelefones;
use Exception;
use Illuminate\Support\Facades\Http;

class UpdateUserContactWhatsappService
{
    function optionsFetch($token)
    {
        return [
            'headers' => [
                'Authorization' => "Bearer {$token}",
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'userId' => 4,
                'contactId' => 27,
            ],
        ];
    }

    public function update($leadId, $userId = null)
    {
        $settings = (new SettingsWatsappService())->settings();

        if (empty($settings['apiKey'])) {
            throw new \InvalidArgumentException('API key is missing in settings.');
        }

        // Obtenha o ID do WhatsApp associado ao usuário
        $whatsappUsuario = (new WhatsappUsuario())
            ->where('user_id', $userId)
            ->first('whatsapp_id');
        $whatsappId = $whatsappUsuario ? $whatsappUsuario->whatsapp_id : null;

        if (is_null($whatsappId)) {
            $whatsappId = null;
        }

        $telefones = (new LeadTelefones())
            ->where('lead_id', $leadId)
            ->whereNotNull('whatsapp_id')
            ->get(['whatsapp_id']);

        // Verifica se há telefones para processar
        if ($telefones->isEmpty()) {
            throw new \DomainException("No WhatsApp IDs found for lead ID: $leadId");
        }

        $url = "{$settings['urlBackend']}/api/contacts/update-user";

        try {
            foreach ($telefones as $contato) {
                // Realiza a chamada HTTP para cada telefone
                Http::accept('application/json')
                    ->withToken($settings['apiKey'])
                    ->post($url, [
                        'userId' => $whatsappId,
                        'contactId' => $contato['whatsapp_id'],
                    ]);
            }
        } catch (\Exception $e) {
            throw new \DomainException("Failed to update user contacts at $url: {$e->getMessage()}");
        }
    }


    protected function analyzeError($response): string
    {
        $errorMessage = $response->json('message', 'Erro desconhecido');
        return "Erro ao atualizar contato";
    }
}
