<?php

namespace App\Models\Curso;

use Illuminate\Database\Eloquent\Model;

class AlunoCurso extends Model
{
    protected $fillable = ['user_id', 'curso_id'];
}
