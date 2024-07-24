<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosCategoriasUsuarios extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'categoria_id'
    ];

    public function atualizar($id, $categorias)
    {
        $this->newQuery()
            ->where('user_id', $id)
            ->delete();

        if ($categorias) foreach ($categorias as $idCategoria => $item) {
            if ($item) $this->newQuery()
                ->create([
                    'user_id' => $id,
                    'categoria_id' => $idCategoria,
                ]);
        }
    }

    public function categoriasId($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->pluck('id', 'categoria_id');
    }
    public function categorias($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->pluck( 'categoria_id');
    }
}
