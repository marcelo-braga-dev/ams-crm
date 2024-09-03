<?php

namespace App\Models\Leads;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsTelefones extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'numero',
        'status_whatsapp',
        'status_telefone',
    ];

    public function cadastrar(int $id, int $numero)
    {
        $this->newQuery()
            ->create([
                'lead_id' => $id,
                'numero' => $numero,
            ]);
    }

    public function ativar($id)
    {
        $telefone = $this->find($id);

        if ($telefone) {
            $telefone->status_whatsapp = 2;
            $telefone->save();
        }
    }

    public function inativar($id)
    {
        $telefone = $this->find($id);

        if ($telefone) {
            $telefone->status_whatsapp = 0;
            $telefone->save();
        }
    }

    public function alterarStatusTelefone($id, $status)
    {
        $telefone = $this->find($id);

        if ($telefone) {
            $telefone->status_telefone = $status ? 2 : 0;
            $telefone->save();
        }
    }
}
