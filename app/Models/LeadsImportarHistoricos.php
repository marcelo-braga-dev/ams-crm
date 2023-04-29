<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsImportarHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'setor',
        'qtd',
    ];

    public function create($setor)
    {
        return $this->newQuery()
            ->create([
                'users_id' => id_usuario_atual(),
                'setor' => $setor,
            ])->id;
    }

    public function atualizar($id, $qtd)
    {
        $this->newQuery()
            ->find($id)
            ->update(['qtd' => $qtd]);
    }

    public function historicos()
    {
        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNome();

        return $this->newQuery()
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $setores) {
                return [
                    'nome' => $nomes[$item->users_id],
                    'setor' => $setores[$item->setor],
                    'qtd' => $item->qtd,
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });
    }
}
