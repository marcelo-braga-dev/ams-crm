<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comissoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'ano',
        'jan',
        'fev',
        'mar',
        'abr',
        'mai',
        'jun',
        'jul',
        'ago',
        'set',
        'out',
        'nov',
        'dez',
    ];

    public function create($id, $dados)
    {
        $this->newQuery()
            ->create([
                'user_id' => $id,
                'margem' => $dados->margem,
                'comissao' => $dados->comissao,
            ]);
    }

    public function comissao($id)
    {
        return $this->newQuery()
            ->where('user_id', $id)
            ->first();
    }

    public function comissaoConsultores(): array
    {
        $dados = $this->newQuery()->get();

        $metas = [];
        foreach ($dados as $dado) {
            $metas[$dado['user_id']] = $dado;
        }
        return $metas;
    }

    public function createOrUpdate($id, $dados)
    {
        $this->newQuery()
            ->updateOrCreate(
                ['user_id' => $id],
                [
                    'ano' => 2023,
                    'jan' => $dados->jan,
                    'fev' => $dados->fev,
                    'mar' => $dados->mar,
                    'abr' => $dados->abr,
                    'mai' => $dados->mai,
                    'jun' => $dados->jun,
                    'jul' => $dados->jul,
                    'ago' => $dados->ago,
                    'set' => $dados->set,
                    'out' => $dados->out,
                    'nov' => $dados->nov,
                    'dez' => $dados->dez,
                ]
            );
    }
}
