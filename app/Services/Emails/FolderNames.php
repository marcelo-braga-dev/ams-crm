<?php

namespace App\Services\Emails;

class FolderNames
{
    public function traduzirPT($valor): string
    {
        return match ($valor) {
            'INBOX' => 'Caixa de Entrada',
            'Archive' => 'Arquivo',
            'Sent', 'enviadas' => 'Enviados',
            'Trash', 'lixo' => 'Lixeira',
            'Drafts', 'rascunho' => 'Rascunhos',
            'Junk', 'Mala_Direta' => 'Span',
            default => $valor,
        };
    }

    public function nameLixo()
    {
        return 'INBOX.lixo';
    }
}
