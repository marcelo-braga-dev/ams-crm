<?php

namespace App\Services\IntegracoesDistribuidoras;

use Illuminate\Support\Facades\Http;

class Integracoes
{
    public function autenticar()
    {
        $url = 'https://api.edeltecsolar.com.br/api-access/token';
        $response = Http::withHeader('Content-Type', 'application/json')
            ->post($url, [
                'apiKey' => 'c2ea3401-18b0-4aa0-8776-c0a0e9a4505a',
                'secret' => 'PxEWSPizufT9Zb9O5jnPoNj/Vb8ng0yfY/EQ9ZLkd2U=',
            ]);

        return $response->body();
    }
}
