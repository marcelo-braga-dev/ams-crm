<?php

namespace App\Models\Curso;

use Illuminate\Database\Eloquent\Model;

class AvaliacaoModuloCurso extends Model
{
    protected $with = ['alternativas'];
    public function alternativas()
    {
        return $this->hasMany(QuestaoAvaliacaoModuloCurso::class, 'avaliacao_id', 'id');
    }
}
