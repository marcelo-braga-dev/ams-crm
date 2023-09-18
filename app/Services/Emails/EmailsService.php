<?php

namespace App\Services\Emails;

use App\Models\Email;
use App\Models\EmailConfigs;
use Laminas\Mail\Exception\DomainException;
use Laminas\Mail\Header\Exception\InvalidArgumentException;
use Laminas\Mail\Storage\Exception\RuntimeException;
use Laminas\Mail\Storage\Imap;
use RecursiveIteratorIterator;
use Laminas\Mail\Storage;

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
                'ssl' => 'SSL',
                'port' => $porta
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
        (new FoldersEmailsService())->selecionarFolder($this->emails, $folder);

        try {
            $msgs = [];
            foreach ($this->emails as $index => $message) {
                $msgs[] = [
                    'id' => $index,
                    'autor' => $message->from,
                    'titulo' => $message->subject ?? null,
                    'data' => date('d/m/y H:i:s', strtotime($message->date)),
                    'flags' => $this->getFlags($message)
                ];
            }

            rsort($msgs);
        } catch (InvalidArgumentException $exception) {
            modalErro('Algumas mensagens não foram carregadas.');
        }

        return $msgs;
    }

    public function getMensagem(int $id, string $folder = null): array
    {
        (new FoldersEmailsService())->selecionarFolder($this->emails, $folder);
        $message = $this->emails->getMessage($id);

        $dados = [
            'id' => $id,
            'titulo' => $message->subject,
            'remetente' => [
                'nome' => $message->from ?? '',
                'email' => $this->getEmailDestinatario($message),
            ],
            'text' => [],
            'html' => [],
            'pdf' => [],
            'imagem' => [],
        ];

        foreach (new RecursiveIteratorIterator($message) as $part) {
            try {
                $tipo = strtok($part->contentType, ';');
                switch ($tipo) {
                    case 'text/plain':
                        $dados['text'][] = $part->getContent();
                        break;
                    case 'text/html':
                        $dados['html'][] = trim(quoted_printable_decode($part->getContent()));
                        break;
                    case 'application/pdf':
                        $dados['pdf'][] = [
                            'nome' => $part->getHeader('ContentDisposition')->getParameter('filename'),
                            'conteudo' =>
                                'data:' . $tipo . ';' .
                                $part->contenttransferencoding . ',' .
                                $part->getContent(),
                            'encoding' => $part->contenttransferencoding,
                        ];
                        break;
                    case 'image/png':
                        $dados['imagem'][] = [
                            'nome' => $part->getHeader('ContentDisposition')->getParameter('filename'),
                            'conteudo' =>
                                'data:' . $tipo . ';' .
                                $part->contenttransferencoding .
                                ',' .
                                $part->getContent(),
                            'encoding' => $part->contenttransferencoding,
                        ];
                        break;
                }
            } catch (DomainException $e) {
            }
        }

        return $dados;
    }

    private function getFlags($message)
    {
        $flags = $message->getFlags();

        return [
            'visualizado' => (bool)($flags[Storage::FLAG_SEEN] ?? false),
            'respondida' => (bool)($flags[Storage::FLAG_ANSWERED] ?? false),
            'recente' => (bool)($flags[Storage::FLAG_RECENT] ?? false),
            'sinalizado' => (bool)($flags[Storage::FLAG_FLAGGED] ?? false),
        ];
    }

    public function getFolders()
    {
        return (new FoldersEmailsService())->folders($this->emails);
    }

    public function enviarLixeira($id)
    {
        $this->emails->moveMessage($id, (new FolderNames())->nameLixo());
    }

    public function close()
    {
        $this->emails->close();
    }

    private function getEmailDestinatario($message)
    {
        $search = explode('<', $message->from);
        return str_replace('>', '', end($search));
    }
}
