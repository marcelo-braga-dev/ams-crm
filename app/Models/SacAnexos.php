<?php

namespace App\Models;

use App\Services\Images;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SacAnexos extends Model
{
    use HasFactory;

    protected $fillable = [
        'sac_mensagens_id',
        'url',
        'mime'
    ];

    public function create(int $id, $dados)
    {
        if ($dados->anexos) foreach ($dados->anexos as $anexo) {
            $url = (new Images())->armazenarSeparado($anexo, 'chamados-anexos');

            $this->newQuery()
                ->create([
                    'sac_mensagens_id' => $id,
                    'url' => $url,
                    'mime' => null,
                ]);
        }
    }

    public function mensagem()
    {
        return $this->belongsTo(SacMensagens::class, 'sac_mensagens_id');
    }
}
