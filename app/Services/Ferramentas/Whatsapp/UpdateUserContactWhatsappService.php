<?php

namespace App\Services\Ferramentas\Whatsapp;

use App\Models\Ferramentas\Whatsapp\WhatsappUsuario;
use App\Models\Lead\LeadTelefones;
use Illuminate\Support\Facades\Http;

class UpdateUserContactWhatsappService
{
    public function update($leadId, $userId = null)
    {

        $settings = (new SettingsWatsappService())->settings();

        if (empty($settings['apiKey'])) {
            return;
        }

        $whatsappUsuario = (new WhatsappUsuario())
            ->where('user_id', $userId)
            ->first('whatsapp_id');

        $whatsappId = $whatsappUsuario?->whatsapp_id;

        $telefones = (new LeadTelefones())
            ->where('lead_id', $leadId)
            ->whereNotNull('whatsapp_id')
            ->get();

        // Verifica se há telefones para processar
        if ($telefones->isEmpty()) {
            return;
        }

        $url = "{$settings['urlBackend']}/api/contacts/update-user";

        try {
            foreach ($telefones as $contato) {
                Http::accept('application/json')
                    ->withToken($settings['apiKey'])
                    ->post($url, [
                        'userId' => $whatsappId,
                        'contactId' => $contato['whatsapp_id'],
                    ]);
            }
        } catch (\Exception $e) {
            throw new \DomainException("$url: {$e->getMessage()}");
        }
    }


    protected function analyzeError($response): string
    {
        $errorMessage = $response->json('message', 'Erro desconhecido');
        return "Erro ao atualizar contato";
    }
}
