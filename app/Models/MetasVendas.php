<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetasVendas extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'meta'
    ];

    public function createOrUpdate($id, $meta)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['users_id' => $id],
                ['meta' => convert_money_float($meta)]
            );
    }

    public function metas()
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado->users_id] = $dado->meta;
        }
        return $metas;
    }

    public function metasConsultores()
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado->users_id] = convert_float_money($dado->meta);
        }
        return $metas;
    }

    public function getMeta($id)
    {
        $dado = $this->newQuery()
            ->where('users_id', $id)
            ->first();

        return convert_float_money($dado->meta ?? 0);
    }
}
