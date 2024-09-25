<?php

namespace App\Models\Lead;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadStatus extends Model
{
    use HasFactory;

    protected $fillable = ['nome', 'cor', 'ordem', 'prazo_dias', 'status_inicial'];
    protected $hidden = ['created_at', 'updated_at'];

//    protected $with = ['leads'];

    public function leads()
    {
        return $this->hasMany(Lead::class, 'status_id', 'id');
    }
}
