<?php

namespace App\Services\Ferramentas\Voip;

use PAMI\Client\Impl\ClientImpl;
use PAMI\Message\Action\OriginateAction;

class VoipService
{
    protected $pamiClient;

    public function __construct()
    {
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
}
