<?php

namespace App\Models;

use App\src\Leads\Status\StatusLeads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LeadsStatusHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'status',
        'anotacao'
    ];

    public function create($id, $status, $msg = null)
    {
        $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $id,
                'status' => $status,
                'anotacao' => $msg
            ]);
    }

    public function periodoStatus(string $status, array $mes, string $ano)
    {
        return $this->newQuery()
            ->whereIn(DB::raw('MONTH(created_at)'), $mes)
            ->whereYear('created_at', $ano)
            ->where('status', $status)
            ->selectRaw('user_id, COUNT(id) as qtd')
            ->groupBy('user_id')
            ->pluck('qtd', 'user_id');
    }

    public function qtdUsuario($id, mixed $mes, mixed $ano)
    {
        return $this->newQuery()
            ->whereIn(DB::raw('MONTH(created_at)'), $mes)
            ->whereYear('created_at', $ano)
            ->where('user_id', $id)
            ->selectRaw('user_id, status, COUNT(id) as qtd')
            ->groupBy('status')
            ->pluck('qtd', 'status');
    }


    public function qtdUsuarios(array $mes, int $ano)
    {
        $items = $this->newQuery()
            ->whereIn(DB::raw('MONTH(created_at)'), $mes)
            ->whereYear('created_at', $ano)
            ->selectRaw('user_id, status, COUNT(status) as qtd')
            ->groupBy(['user_id', 'status'])
            ->get();

        $res = [];
        foreach ($items as $item) {
            $res[$item->user_id][$item->status] = $item->qtd;
        }

        return $res;
    }

    public function getId($id)
    {
        $statusNome = (new StatusLeads())->nomesStatus();
        return $this->newQuery()
            ->join('users', 'leads_status_historicos.user_id', '=', 'users.id')
            ->where('lead_id', $id)
            ->orderByDesc('id')
            ->get(['leads_status_historicos.*', 'users.name AS nome'])
            ->each(function ($item) use ($statusNome) {
                $item->status = $statusNome[$item->status] ?? '';
                $item->data = date('d/m/y H:i', strtotime($item->created_at));
            });

    }

    public function relatorioDashboard($id, array $mes, $ano)
    {
        return $this->newQuery()
            ->leftJoin('leads', 'leads_status_historicos.lead_id', '=', 'leads.id')
            ->where('leads_status_historicos.user_id', $id)
            ->whereIn(DB::raw('MONTH(leads_status_historicos.created_at)'), $mes)
            ->whereYear('leads_status_historicos.created_at', $ano)
            ->select([
                'leads_status_historicos.*',
                'leads_status_historicos.status AS status',
                'leads_status_historicos.created_at AS created_at',
                'leads.id AS lead_id',
                'leads.nome AS lead_nome',
                'leads.razao_social AS lead_razao_social',
                'leads.cnpj AS lead_cnpj',
            ])
            ->get()
            ->groupBy('lead_id')
            ->map(function ($items) {
                $lead = $items->first();
                $statuses = $items->map(function ($item) {
                    return [
                        'status' => $item->status,
                        'status_data' => date('d/m/y H:i', strtotime($item->created_at)),
                    ];
                })->toArray();

                return [
                    'lead_id' => $lead->lead_id,
                    'lead_nome' => $lead->lead_nome,
                    'lead_razao_social' => $lead->lead_razao_social ?? $lead->lead_nome,
                    'status' => $statuses,
                ];
            })
            ->values();
    }
}
