<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dev extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'status',
        'titulo',
        'descricao',
        'anotacoes',
        'data_prazo',
        'area',
        'prioridade',
        'setor'
    ];

    public function create($request)
    {
        $dados = $this->newQuery()
            ->create([
                'titulo' => $request->titulo,
                'descricao' => $request->descricao,
                'data_prazo' => $request->prazo,
                'status' => 'novo',
                'area' => $request->area,
                'prioridade' => $request->prioridade,
                'setor' => $request->setor
            ]);
        return $dados->id;
    }

    public function get()
    {
        return $this->newQuery()
            ->get();
    }

    public function find($id)
    {
        $nomes = (new User())->getNomes();
        $dado = $this->newQuery()->find($id);

        return [
            'id' => $dado->id,
            'nome' => $nomes[$dado->users_id] ?? '',
            'status' => $dado->status,
            'titulo' => $dado->titulo,
            'descricao' => $dado->descricao,
            'anotacoes' => $dado->anotacoes,
            'data_prazo' => date('d/m/Y', strtotime($dado->data_prazo)),
            'area' => $dado->area,
            'prioridade' => $dado->prioridade
        ];
    }

    public function updateStatus($id, string $string)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'status'=>$string
            ]);
    }
}
