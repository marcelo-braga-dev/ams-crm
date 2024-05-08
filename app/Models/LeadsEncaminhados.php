<?php

namespace App\Models;

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

    public function create($dados)
    {
        $this->newQuery()
            ->create([
                'user_id' => $dados,
                'user_encaminhado' => $dados,
                'lead_id' => $dados,
            ]);
    }
}
