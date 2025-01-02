<?php

namespace App\Services\Ferramentas\Voip;

use PAMI\Client\Impl\ClientImpl;
use PAMI\Message\Action\OriginateAction;
use Illuminate\Support\Facades\Http;

class VoipService
{
    protected ClientImpl $pamiClient;
    protected string $baseUri;
    protected string $apiKey;

    public function __construct()
    {
        $this->baseUri = 'http://5.161.48.234:8088/ari';
        $this->apiKey = 'user_laravel_env:password_laravel_env';

        $options = [
            'host' => config('voip.host'),
            'port' => config('voip.port'),
            'username' => config('voip.user'),
            'secret' => config('voip.pass'),
            'connect_timeout' => 10,
            'read_timeout' => 10,
        ];

        $this->pamiClient = new ClientImpl($options);
    }

    public function makeExternalCall($from, $to)
    {
        $response = Http::post("{$this->baseUri}/channels", [
            "endpoint" => "PJSIP/server_external",
            "extension" => "5517997015338",
            "context" => "from-server-external",
            "priority" => 1,
            "callerId" => "1001",
//            'endpoint' => "PJSIP/{$from}",
//            'extension' => $to,
//            'context' => 'from-server-external',
//            'priority' => 1,
//            'callerId' => $from,
            'api_key' => $this->apiKey,
            'Authorization' => 'Basic ' . base64_encode($this->apiKey),
        ], [
            'Authorization' => 'Basic ' . base64_encode($this->apiKey),
            'api_key' => $this->apiKey,
        ]);

        return $response->json();
    }

    /**
     * @deprecated
     */
    public function originateCall(string $from, string $to, string $context, string $extension, int $priority)
    {
        try {
            $this->pamiClient->open();

            $originateMsg = new OriginateAction("SIP/{$from}");
            $originateMsg->setCallerId($from);
            $originateMsg->setContext($context);
            $originateMsg->setExtension($extension);
            $originateMsg->setPriority($priority);
            $originateMsg->setVariable('CALLERID(num)', $from);
            $originateMsg->setVariable('DESTINATION', $to);

            $response = $this->pamiClient->send($originateMsg);

            $this->pamiClient->close();

            return $response->isSuccess() ? 'Call placed successfully' : $response->getMessage();
        } catch (\Exception $e) {
            return 'Error: ' . $e->getMessage();
        }
    }

    public function getAsteriskInfo()
    {
        $response = Http::get("{$this->baseUri}/asterisk/info", [
            'api_key' => $this->apiKey,
        ]);

        return $response->json();
    }

    public function getChannels()
    {
        $response = Http::get("{$this->baseUri}/channels", [
            'api_key' => $this->apiKey,
        ]);

        return $response->json();
    }
}
