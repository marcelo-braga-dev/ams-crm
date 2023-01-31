<?php

namespace App\Services\Emails;

use Laminas\Mail\Storage\Exception\InvalidArgumentException;
use Laminas\Mail\Storage\Imap;
use RecursiveIteratorIterator;

class FoldersEmailsService
{
    public function folders(Imap $emails, $folderAtual): array
    {
        $folders = new RecursiveIteratorIterator(
            $emails->getFolders(),
            RecursiveIteratorIterator::SELF_FIRST
        );

        $dados = [];
        foreach ($folders as $localName => $folder) {
            $dados[] = [
                'nome' => $this->traduzirPT(htmlspecialchars($localName)),
                'tag' => htmlspecialchars($localName),
                'selecionado' => htmlspecialchars($localName) == $folderAtual ? 1 : 0,
                'nivel' => $folders->getDepth()
            ];
        }

        return $dados;
    }

    public function selecionarFolder($emails, $folder)
    {
        if ($folder) {
            $imbox = 'INBOX';
            try {
                $folderSelecionado = $emails->getFolders()->$imbox->$folder;
                $emails->selectFolder($folderSelecionado);
            } catch (InvalidArgumentException) {
                //
            }
        }
    }

    private function traduzirPT($valor): string
    {
        $folders = [
            'INBOX' => 'Caixa de Entrada',
            'Archive' => 'Arquivadas',
            'Sent' => 'Enviados',
            'Trash' => 'Lixeira',
            'Drafts' => 'Rascunhos',
            'spam' => 'Spam'
        ];

        return $folders[$valor] ?? $valor;
    }
}
