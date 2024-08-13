<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FerramentasTarefasMensagens extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tarefa_item_id',
        'msg'
    ];

    public function create($tarefaId, $msg)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'tarefa_item_id' => $tarefaId,
                'msg' => $msg
            ]);
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
