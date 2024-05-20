<?php

namespace App\Models;

use App\src\Usuarios\Status\AtivoStatusUsuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsEncaminhados extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'user_encaminhado',
        'lead_id',
    ];

    public function create($id, $idLead)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'user_encaminhado' => $id,
                'lead_id' => $idLead,
            ]);
    }

    public function ultimoVendedorEnviado($setor)
    {
        $dados = $this->newQuery()
            ->join('users', 'leads_encaminhados.user_encaminhado', '=', 'users.id')
            ->where('users.setor_id', $setor)
            ->where('users.status', (new AtivoStatusUsuario())->getStatus())
            ->orderByDesc('leads_encaminhados.id')
            ->first('user_encaminhado');

        return $dados['user_encaminhado'] ?? null;
    }
}
