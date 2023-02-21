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

    public function create(int $id, $dados)
    {
        (new Leads())->atualizarDataStatus($id);

        return $this->newQuery()
            ->create([
                'users_id' => auth()->id(),
                'leads_id' => $id,
                'status' => $dados->status,
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
}
