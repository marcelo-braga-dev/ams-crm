<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leads extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id'
    ];

    public function getDisponiveis()
    {
        return $this->newQuery()
            ->where('users_id', '=', null)->get();
    }

    public function setConsultor($idConsultor, $selecionados)
    {
        foreach ($selecionados as $item) {
            $this->newQuery()
                ->where('id', $item)->update(['users_id' => $idConsultor]);
        }
    }
}
