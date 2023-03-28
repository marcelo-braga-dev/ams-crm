<?php

namespace App\Models;

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

    public function create(int $id, $dados, $status)
    {
        (new Leads())->atualizarDataStatus($id);

        return $this->newQuery()
            ->create([
                'users_id' => auth()->id(),
                'leads_id' => $id,
                'status' => $status,
                'msg' => $dados->msg,
                'meio_contato' => $dados->meio_contato
            ]);
    }

    public function dados(int $id)
    {
        return $this->newQuery()
            ->where('leads_id', $id)
            ->get();
    }

    public function ultimaMsg()
    {
        $dados = $this->newQuery()
            ->orderBy('id')
            ->get(['leads_id', 'msg']);

        $items = [];
        foreach ($dados as $dado) {
            $items[$dado->leads_id] = $dado->msg;
        }
        return $items;
    }
}
