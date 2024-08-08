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
        'texto'
    ];

    public function create($id, $msgs)
    {
        foreach ($msgs ?? [] as $msg) {
            $this->newQuery()
                ->create([
                    'tarefa_id' => $id,
                    'status' => 0,
                    'texto' => $msg
                ]);
        }
    }

    public function get($id)
    {
        return $this->newQuery()
            ->where('tarefa_id', $id)
            ->get();
    }

    public function alterarStatus($id, $status)
    {
        $this->newQuery()
            ->find($id)
            ->update(['status' => $status]);
    }
}
