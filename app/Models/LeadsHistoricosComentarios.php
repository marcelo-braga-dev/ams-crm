<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsHistoricosComentarios extends Model
{
    use HasFactory;

    protected $fillable = [
        'leads_historicos_id',
        'users_id',
        'msg',
        'status',
    ];

    public function create($id, $msg)
    {
        $this->newQuery()
            ->create([
                'leads_historicos_id' => $id,
                'users_id' => id_usuario_atual(),
                'msg' => $msg,
            ]);
    }

    public function comentarios(): array
    {
        $dados = $this->newQuery()->get();
        $nomes = (new User())->getNomes();

        $resposta = [];
        foreach ($dados as $dado) {
            $resposta[$dado->leads_historicos_id][] = [
                'nome' => $nomes[$dado->users_id],
                'msg' => $dado->msg,
                'data' => date('d/m/y H:i', strtotime($dado->created_at))
            ];
        }
        return $resposta;
    }
}
