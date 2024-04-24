<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsersHierarquias extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'superior_id'
    ];

    public function getSuperior()
    {
        return $this->newQuery()
            ->pluck('superior_id', 'user_id');
    }

    public function atualizar($id, $dados)
    {
        $query = $this->newQuery();
        $query->where('superior_id', $id)
            ->delete();

        // $query->update([]);
        foreach ($dados as $idSup => $item) {
            if ($item) $query->create(['user_id' => $idSup, 'superior_id' => $id]);
        }
    }
}
