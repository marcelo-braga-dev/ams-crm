<?php

namespace App\Services\Emails;

use App\Models\Email;
use App\Models\EmailConfigs;
use Laminas\Mail\Message;
use Laminas\Mail\Transport\Smtp as SmtpTransport;
use Laminas\Mail\Transport\SmtpOptions;

class SendEmailsService
{
    public function enviar($destinatario, $titulo, $mensagem)
    {
        // Setup SMTP transport using LOGIN authentication
        $dados = (new Email())->dadosUsuario(id_usuario_atual());
        $config = (new EmailConfigs())->dados();

        $message = new Message();
        $message->addTo($destinatario);
        $message->addFrom($dados->email, env('APP_NAME'));
        $message->setSubject($titulo);
        $message->setBody($mensagem);

        $transport = new SmtpTransport();
        $options = new SmtpOptions([
            'name' => 'localhost',
            'host' => $config->host,
            'connection_class' => 'login',
            'port' => $config->port_out,
            'connection_config' => [
                'username' => $dados->email,
                'password' => $dados->password,
            ],
        ]);

        $transport->setOptions($options);
        $transport->send($message);
    }
}
