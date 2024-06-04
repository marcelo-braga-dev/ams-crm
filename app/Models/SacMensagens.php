<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SacMensagens extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'sac_id',
        'msg',
        'prazo'
    ];

    public function create(int $idSac, $dados)
    {
        $item = $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'sac_id' => $idSac,
                'msg' => $dados->msg,
                'prazo' => $dados->prazo,
            ]);

        (new SacAnexos())->create($item->id, $dados);
    }

    public function anexos()
    {
        return $this->hasMany(SacAnexos::class);
    }
}
