<?php

namespace App\Models\Pedidos\Instalacoes;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PedidosInstalacoesAnotacoes extends Model
{
    use HasFactory;

    protected $fillable = [
        'instalacao_id',
        'user_id',
        'titulo',
        'mensagem'
    ];

    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'name as nome');
    }

    public function anexos()
    {
        return $this->hasMany(PedidosInstalacoesAnotacoesAnexos::class, 'anotacoes_id', 'id');
    }

    public function cadastrar($dados)
    {
        $anotacao = $this->newQuery()
            ->create([
                'instalacao_id' => $dados->instalacao_id,
                'user_id' => id_usuario_atual(),
                'titulo' => $dados->titulo,
                'mensagem' => $dados->msg,
            ]);

        if ($dados['anexos'] ?? null) {
            (new PedidosInstalacoesAnotacoesAnexos())->cadastrar($anotacao->id, $dados['anexos']);
        }
    }
}
