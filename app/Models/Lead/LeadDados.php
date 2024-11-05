<?php

namespace App\Models\Lead;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadDados extends Model
{
    use HasFactory;

    protected $fillable = ['lead_id', 'nome', 'razao_social'];
}
