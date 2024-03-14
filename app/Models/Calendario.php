<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Calendario extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'categoria',
        'status',
        'msg',
        'data'
    ];

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'user_id' => $dados->usuario,
                'categoria' => 'geral',
                'status' => 'novo',
                'msg' => $dados->msg,
                'data' => $dados->data
            ]);
    }

    public function mensagens($idUsuario = null)
    {
        $query = $this->newQuery();
        if ($idUsuario) $query->where('user_id', $idUsuario);
        $calendario = $query->get();

        $nomes = (new User())->getNomes();

        $avisosCalendario = [];
        foreach ($calendario as $item) {
            $ano = date('Y', strtotime($item->data));
            $mes = date('m', strtotime($item->data));
            $dia = date('d', strtotime($item->data));

            $avisosCalendario[$ano][intval($mes)][intval($dia)][] = [
                'nome' => $nomes[$item->user_id],
                'msg' => $item->msg
            ];
        }

        return $avisosCalendario;
    }
}
