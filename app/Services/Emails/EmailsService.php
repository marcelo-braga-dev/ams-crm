<?php

namespace App\Services\Emails;

use App\Models\Email;
use App\Models\EmailConfigs;
use Laminas\Mail\Exception\DomainException;
use Laminas\Mail\Storage\Exception\RuntimeException;
use Laminas\Mail\Storage\Imap;
use RecursiveIteratorIterator;

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

    public function getMensagem(int $id): array
    {
        $message = $this->emails->getMessage($id);

        $dados = [
            'titulo' => $message->subject,
            'remetente' => [
                'nome' => $message->sender ?? '',
                'email' => $message->to,
            ],
            'text' => [],
            'html' => [],
            'pdf' => [],
            'imagem' => [],
        ];

        foreach (new RecursiveIteratorIterator($this->emails->getMessage($id)) as $part) {
            try {
                switch (strtok($part->contentType, ';')) {
                    case 'text/plain':
                        $dados['text'][] = $part->getContent();
                        break;
                    case 'text/html':
                        $dados['html'][] = trim(quoted_printable_decode($part->getContent()));
                        break;
                    case 'application/pdf':
                        $dados['pdf'][] = [
                            'nome' => $part->getHeader('ContentDisposition')->getParameter('filename'),
                            'conteudo' => $part->getContent(),
                            'encoding' => $part->contenttransferencoding,
                        ];
                        break;
                    case 'image/png': //print_pre($part);
                        $dados['imagem'][] = [
                            'nome' => $part->getHeader('ContentDisposition')->getParameter('filename'),
                            'conteudo' => $part->getContent(),
                            'encoding' => $part->contenttransferencoding,
                        ];
                        break;
                }
            } catch (DomainException $e) {
                // ignore
            }
        }

//        print_pre($dados);
        return $dados;
    }

    private function getFlags($message)
    {
        $flags = $message->getFlags();
        if (isset($flags['\Seen'])) return 'visualizado';
    }

    public function getFolders($folderAtual = null)
    {
        return (new FoldersEmailsService())->folders($this->emails, $folderAtual);
    }
}
