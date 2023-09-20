<?php

namespace App\Services\Emails;

use Laminas\Mail\Storage\Exception\InvalidArgumentException;
use Laminas\Mail\Storage\Imap;
use RecursiveIteratorIterator;

class FoldersEmailsService
{
    public function folders(Imap $emails): array
    {
        $folders = new RecursiveIteratorIterator(
            $emails->getFolders(),
            RecursiveIteratorIterator::SELF_FIRST
        );
        $folderAtual = $emails->getCurrentFolder();

        foreach ($folders as $localName => $folder) {

            if ($localName == 'INBOX') $dados[0] = $this->dadosTag($localName, $folder, $folderAtual, $folders, true);
            if ($localName == 'Drafts') $dados[1] = $this->dadosTag($localName, $folder, $folderAtual, $folders);
            if ($localName == 'Sent') $dados[2] = $this->dadosTag($localName, $folder, $folderAtual, $folders);
            if ($localName == 'Junk') $dados[3] = $this->dadosTag($localName, $folder, $folderAtual, $folders);
            if ($localName == 'Trash') $dados[4] = $this->dadosTag($localName, $folder, $folderAtual, $folders);
            if ($localName == 'Archive') $dados[5] = $this->dadosTag($localName, $folder, $folderAtual, $folders);
        }

        ksort($dados);
        foreach ($folders as $localName => $folder) {

            if ($localName !== 'INBOX' &&
                $localName !== 'Drafts' &&
                $localName !== 'Sent' &&
                $localName !== 'Junk' &&
                $localName !== 'Trash' &&
                $localName !== 'Archive') $dados[] = $this->dadosTag($localName, $folder, $folderAtual, $folders);
        }
//        print_pre($dados);
        return $dados;
    }

    private function dadosTag($localName, $folder, $folderAtual, $folders, $folderx = false)
    {
        return [
            'nome' => (new FolderNames())->traduzirPT(htmlspecialchars($localName)),
            'tag' => htmlspecialchars($folder->getGlobalName()),
            'selecionado' => $folder->getGlobalName() == $folderAtual,
            'nivel' => $folders->getDepth(),
//            'qtd' => $emails->count()
        ];
    }

    public function selecionarFolder($emails, $folder)
    {
        if ($folder) {
//            $imbox = 'INBOX';
            try {
//                $folderSelecionado = $emails->getFolders()->$imbox->$folder;
                $emails->selectFolder($folder);
            } catch (InvalidArgumentException) {
                //
            }
        }
    }
}
