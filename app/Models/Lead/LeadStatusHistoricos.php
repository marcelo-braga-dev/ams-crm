<?php

namespace App\Models\Lead;

use App\Models\User;
use App\src\Leads\Status\StatusLeads;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class LeadStatusHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'status',
        'anotacao'
    ];

    protected $with = ['user'];

    protected $appends = ['status_nome', 'status_data'];

    // =======================
    // Relacionamentos
    // =======================
    public function lead()
    {
        return $this->hasOne(Lead::class, 'id', 'lead_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function destinatario()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    // =======================
    // Getters
    // =======================
    public function getStatusNomeAttribute()
    {
        return (new StatusLeads())->nome($this->attributes['status']);
    }

    public function getStatusDataAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d/m/Y H:i:s');
    }


    //////////

    /**
     * @deprecated
     */
    public function create($id, $status, $msg = null, $userId = null)
    {
        $userId = $userId ?? id_usuario_atual();
        $this->newQuery()
            ->create([
                'user_id' => $userId,
                'lead_id' => $id,
                'status' => $status,
                'anotacao' => $msg
            ]);
    }

    /**
     * @deprecated
     */
    public function getId($id)
    {
        $statusNome = (new StatusLeads())->nomesStatus();
        return $this->newQuery()
            ->join('users', 'lead_status_historicos.user_id', '=', 'users.id')
            ->where('lead_id', $id)
            ->orderByDesc('id')
            ->get(['lead_status_historicos.*', 'users.name AS nome'])
            ->each(function ($item) use ($statusNome) {
                $item->status = $statusNome[$item->status] ?? '';
                $item->data = date('d/m/y H:i', strtotime($item->created_at));
            });

    }

    /**
     * @deprecated
     */
    public function relatorioDashboard($id, array $mes, $ano)
    {
        return $this->newQuery()
            ->leftJoin('leads', 'lead_status_historicos.lead_id', '=', 'leads.id')
            ->where('lead_status_historicos.user_id', $id)
            ->whereIn(DB::raw('MONTH(lead_status_historicos.created_at)'), $mes)
            ->whereYear('lead_status_historicos.created_at', $ano)
            ->select([
                'lead_status_historicos.*',
                'lead_status_historicos.status AS status',
                'lead_status_historicos.created_at AS created_at',
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
