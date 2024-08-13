<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FerramentasTarefasItens extends Model
{
    use HasFactory;

    protected $fillable = [
        'tarefa_id',
        'status',
        'texto',
        'data_final',
    ];

    public function create($id, $tarefas)
    {
        foreach ($tarefas ?? [] as $tarefa) {
            if ($tarefa['tarefa'] ?? null)
                $this->newQuery()
                    ->create([
                        'tarefa_id' => $id,
                        'status' => 0,
                        'texto' => $tarefa['tarefa'],
                        'data_final' => $tarefa['data'] ?? null
                    ]);
        }
    }

    public function mensagens()
    {
        return $this->hasMany(FerramentasTarefasMensagens::class, 'tarefa_item_id');
    }

    public function get($id)
    {
        return $this->newQuery()
            ->with(['mensagens.autor' => function ($query) {
                $query->select('id', 'name as nome');
            }])
            ->where('tarefa_id', $id)
            ->get()
            ->each(function ($item) {
                $item->data_final = $item->data_final ? date('d/m/y H:i', strtotime($item->data_final)) : null;
                return $item;
            });
    }

    public function alterarStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => $status]);
    }

    public function atualizar($id, $dados)
    {
        foreach ($dados ?? [] as $dado) {
            if ($dado['id'] ?? null) {
                $query = $this->newQuery()->find($dado['id']);

                if ($dado['tarefa'] ?? null) $query->update(['texto' => $dado['tarefa']]);
                if ($dado['data'] ?? null) $query->update(['data_final' => $dado['data']]);
            } else $this->newQuery()
                ->create([
                    'tarefa_id' => $id,
                    'status' => 0,
                    'texto' => $dado['tarefa'],
                    'data_final' => $dado['data'] ?? null
                ]);;
        }
    }

    public function remove($id)
    {
        $this->newQuery()
            ->find($id)
            ->delete();
    }
}
