<?php

namespace App\Models\Ferramentas\Voip;

use Illuminate\Database\Eloquent\Model;

class VoipGravacao extends Model
{
    protected $fillable = [
        'phone_number',
        'call_time',
        'duration',
        'file_path',
    ];
}
