<?php

namespace App\Models;

use App\src\Usuarios\Status\AtivoStatusUsuario;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
/**
 * @deprecated
 */
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

    public function historico()
    {
        $nomes = (new User())->getNomes();

        return $this->newQuery()
            ->join('leads', 'leads.id', '=', 'leads_encaminhados.lead_id')
            ->orderByDesc('leads_encaminhados.id')
            ->get(['leads_encaminhados.id as id', 'leads_encaminhados.user_id', 'user_encaminhado', 'lead_id', 'leads.nome', 'leads_encaminhados.created_at as data'])
            ->transform(function ($item) use ($nomes) {
                return [
                    'id' => $item->id,
                    'nome' => $nomes[$item->user_id] ?? '',
                    'destino' => $nomes[$item->user_encaminhado] ?? '',
                    'lead_id' => $item->lead_id,
                    'lead_nome' => $item->nome,
                    'data' => date('d/m/y H:i:s', strtotime($item->data))
                ];
            });
    }

    public function relatorio($mes, $ano)
    {
        return $this->newQuery()
            ->whereIn(DB::raw('MONTH(created_at)'), $mes)
            ->whereYear('created_at', $ano)
            ->selectRaw('user_id, COUNT(id) as qtd')
            ->groupBy('user_id')
            ->pluck('qtd', 'user_id');
    }

    public function ativosQtd(array $mes, string $ano)
    {
        return $this->newQuery()
            ->join('pedidos', 'leads_encaminhados.lead_id', '=', 'pedidos.lead_id')
            ->whereIn(DB::raw('MONTH(pedidos.created_at)'), $mes)
            ->whereIn(DB::raw('MONTH(leads_encaminhados.created_at)'), $mes)
            ->whereYear('leads_encaminhados.created_at', $ano)
            ->selectRaw('leads_encaminhados.user_id, COUNT(leads_encaminhados.id) as qtd')
            ->groupBy('leads_encaminhados.user_id')
            ->pluck('qtd', 'leads_encaminhados.user_id');
    }
}
