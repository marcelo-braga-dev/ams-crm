<?php

namespace App\Models;

use App\Http\Controllers\Consultor\Leads\MeioContatoLeads;
use App\src\Leads\StatusAtendimentoLeads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'users_id',
        'leads_id',
        'status',
        'msg',
        'meio_contato'
    ];

    public function create($id, $dados)
    {
        return $this->newQuery()
            ->create([
                'users_id' => auth()->id(),
                'leads_id' => $id,
                'status' => $dados->status,
                'msg' => $dados->msg,
                'meio_contato' => $dados->meio_contato
            ]);
    }
private $status;
    public function dados(int $id)
    {
        $dados = $this->newQuery()
            ->where('leads_id', $id)
            ->get();

        $status = (new StatusAtendimentoLeads())->getStatus();
        $statusNomes = (new MeioContatoLeads())->getStatusNomes();

        return $dados->map(function ($item) use ($status, $statusNomes) {
            return [
                'id' => $item['id'],
                'status' => $status[$item['status']] ?? 'Inderteminado',
                'meio_contato' => $statusNomes[$item['meio_contato']],
                'msg' => $item->msg,
                'data_criacao' => date('d/m/Y H:i', strtotime($item->updated_at))
            ];
        });
    }
}
