<?php

namespace App\Models;

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
    public function get(int $id)
    {
        $dados = $this->newQuery()
            ->where('leads_id', $id)
            ->get();

        $status = (new StatusAtendimentoLeads())->getStatus();

        return $dados->map(function ($item) use ($status) {
            return [
                'id' => $item['id'],
                'status' => $status[$item['status']] ?? 'Inderteminado',
                'msg' => $item->msg,
                'data_criacao' => date('d/m/Y H:i', strtotime($item->updated_at))
            ];
        });
    }
}
