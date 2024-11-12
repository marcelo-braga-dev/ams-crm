<?php

namespace App\Models\Curso;

use Illuminate\Database\Eloquent\Model;

class ModuloCurso extends Model
{
    protected $fillable = ['curso_id', 'titulo', 'numero_modulo'];
    protected $appends = ['aulas_qtd'];

    public function aulas()
    {
        return $this->hasMany(AulaModuloCurso::class, 'modulo_id', 'id');
    }
    public function avaliacoes()
    {
        return $this->hasMany(AvaliacaoModuloCurso::class, 'modulo_id', 'id');
    }

    protected function getAulasQtdAttribute()
    {
        return $this->aulas()->count();
    }
}
