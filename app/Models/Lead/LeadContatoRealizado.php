<?php

namespace App\Models\Lead;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadContatoRealizado extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'telefone_id',
        'origem',
        'meta',
    ];

    protected $with = ['anotacoes'];
    protected $appends = ['data_contato'];

    public function getDataContatoAttribute()
    {
        return Carbon::parse($this->attributes['created_at'])->format('d/m/Y H:i:s');
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function telefone()
    {
        return $this->belongsTo(LeadTelefones::class, 'telefone_id', 'id');
    }

    public function anotacoes()
    {
        return $this->hasMany(LeadContatoRealizadoAnotacao::class, 'contato_id', 'id')
            ->orderByDesc('id');
    }

    public function store(int $leadId, int $telefoneId, ?string $origem, ?string $meta): void
    {
        $this->newQuery()->create([
            'user_id' => id_usuario_atual(),
            'lead_id' => $leadId,
            'telefone_id' => $telefoneId,
            'origem' => $origem,
            'meta' => $meta,
        ]);
    }
}
