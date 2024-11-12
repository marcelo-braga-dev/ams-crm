<?php

namespace App\Models\Curso;

use Illuminate\Database\Eloquent\Model;

class AulaModuloCurso extends Model
{
    protected $fillable = [
        'modulo_id',
        'nome',
        'anexo',
        'anexo_tipo',
        'conteudo'
    ];
}
