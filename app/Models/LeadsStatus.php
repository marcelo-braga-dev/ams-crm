<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @deprecated
 */
class LeadsStatus extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'setores_id',
        'nome'
    ];

    public function status()
    {
        $setores = (new Setores())->getNomes();

        $items = $this->newQuery()
            ->get()
            ->transform(function ($dados) {
                return [
                    'id' => $dados->id,
                    'nome' => $dados->nome,
                    'setores_id' => $dados->setores_id
                ];
            });

        $dados = [];
        foreach ($items as $item) {
            $dados[$item['setores_id']]['nome'] = $setores[$item['setores_id']]['nome'] ?? null;
            $dados[$item['setores_id']]['id'] = $item['setores_id'];
            $dados[$item['setores_id']]['itens'][] = [
                'id' => $item['id'],
                'nome' => $item['nome']
            ];
        }

        $res = [];
        foreach ($dados as $item) {
            $res[] = $item;
        }

        return $res;
    }

    public function statusCategoria($id)
    {
        return $this->newQuery()
            ->where('setores_id', $id)
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                ];
            });
    }

    public function atualizar($id, $valor)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'nome' => $valor
            ]);
    }

    public function create($categoria, $nome)
    {
        $this->newQuery()
            ->create([
                'setores_id' => $categoria,
                'nome' => $nome
            ]);
    }

    public function statusCategorias()
    {
        return $this->newQuery()
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'nome' => $item->nome,
                ];
            });
    }
}
