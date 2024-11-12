<?php

namespace App\Models\Curso;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = ['titulo', 'sub_titulo', 'descricao', 'capa'];


}
