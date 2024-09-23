<?php

namespace App\Models\Pedidos\Instalacoes;

use App\Services\UploadFiles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosInstalacoesAnotacoesAnexos extends Model
{
    use HasFactory;

    protected $fillable = [
        'anotacoes_id',
        'nome',
        'url',
        'mime'
    ];

    public function getUrlAttribute($value)
    {
        return url('storage/' . $value);
    }

    public function cadastrar($anotacaoId, $anexos)
    {
        $urls = [];
        foreach ($anexos as $anexo) {
            $url = (new UploadFiles())->armazenarSeparado($anexo, 'pedidos_instalacoes_anexos');
            $urls[] = [
                'anotacoes_id' => $anotacaoId,
                'url' => $url
            ];
        }

        $this::insert($urls);
    }
}
