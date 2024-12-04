<?php

namespace App\Models\Lead;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class LeadEncaminhadoHistorico extends Model
{
    protected $fillable = [
        'user_id',
        'destinatario_id',
        'lead_ids',
        'qtd'
    ];

    protected $appends = ['leads', 'criado_em'];
    protected $with = ['autor', 'destinatario'];
    protected $casts = ['lead_ids' => 'array'];

    //=================
    // Relations
    //=================
    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function destinatario()
    {
        return $this->belongsTo(User::class, 'destinatario_id');
    }

    //=================
    // Getters
    //=================
    public function getLeadsAttribute()
    {
        return Lead::whereIn('id', $this->lead_ids)->get();
    }

    public function getCriadoEmAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d/m/Y H:i:s');
    }
}
