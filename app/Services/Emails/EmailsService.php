<?php

namespace App\Services\Emails;

use App\Models\Email;
use App\Models\EmailConfigs;
use Laminas\Mail\Storage\Exception\RuntimeException;
use Laminas\Mail\Storage\Imap;

class EmailsService
{
    private Imap $emails;

    public function __construct()
    {
        $dados = (new Email())->dadosUsuario(id_usuario_atual());
        $config = (new EmailConfigs())->dados();

        $host = $config->host ?? '';
        $porta = $config->port_in ?? '';
        $usuario = $dados->email ?? '';
        $senha = $dados->password ?? '';

        try {
            $this->emails = new Imap([
                'host' => $host,
                'user' => $usuario,
                'password' => $senha,
                'ssl' => 'SSL'
            ]);
        } catch (RuntimeException $exception) {
            if ($exception->getCode() == 0) {
                throw new \DomainException('Senha ou email inválidos.');
            }
        } catch (\Laminas\Mail\Protocol\Exception\RuntimeException $exception) {
            throw new \DomainException('Configurações inválidas.');
        }
    }

    public function getMensagens($folder = null)
    {
        // Seleciona Pasta
        (new FoldersEmailsService())->selecionarFolder($this->emails, $folder);

        $msgs = [];
        foreach ($this->emails as $index => $message) {
            $msgs[] = [
                'id' => $index,
                'autor' => $message->from,
                'titulo' => $message->subject,
                'data' => date('d/m/y H:i:s', strtotime($message->date)),
                'flag' => $this->getFlags($message)
            ];
        }
        rsort($msgs);

        return $msgs;
    }

    public function getMensagem(int $id)
    {
        $message = $this->emails->getMessage($id);

        function convertBody($part)
        {
            $tipo = $part->getHeader('contenttransferencoding');
            if ($tipo->getTransferEncoding() == 'base64') {
                return base64_decode($part->getContent());
            }
            if ($tipo->getTransferEncoding() == 'quoted-printable') {
                return trim(quoted_printable_decode($part->getContent()));
            }
        }

        $dados = [];

        if ($message->isMultipart()) {
            for ($i = 1; $i <= $message->countParts(); $i++) {
                $part = $message->getPart(2);

                $dados = [
                    'body' => trim(quoted_printable_decode($part->getContent()))
                ];
            }
        } else $dados = [
            'body' => trim(quoted_printable_decode($message->getContent()))
        ];

        return $dados;
    }

    private function getFlags($message)
    {
        $flags = $message->getFlags();
        if (isset($flags['\Seen']) ) return 'visualizado';
    }

    public function getFolders($folderAtual = null)
    {
        return (new FoldersEmailsService())->folders($this->emails, $folderAtual);
    }
}
