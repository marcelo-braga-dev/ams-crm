<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @deprecated
 */
class LeadsRegistros extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'campo_id',
        'valor',
        'status',
    ];
}
