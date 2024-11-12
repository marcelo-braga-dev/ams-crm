<?php

namespace App\Models\Curso;

use Illuminate\Database\Eloquent\Model;

class QuestaoAvaliacaoModuloCurso extends Model
{
    protected $fillable = ['avaliacao_id', 'alternativa', 'titulo'];
}
