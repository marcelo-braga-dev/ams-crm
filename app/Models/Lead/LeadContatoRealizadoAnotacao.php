<?php

namespace App\Models\Lead;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class LeadContatoRealizadoAnotacao extends Model
{
    protected $fillable = ['user_id', 'contato_id', 'msg'];

    protected $with = ['autor'];
    protected $appends = ['criado_em'];

    protected function getCriadoEmAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d/m/Y H:i:s');
    }

    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
