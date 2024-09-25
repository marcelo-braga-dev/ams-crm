<?php

namespace App\Models\Lead;

use App\Models\LeadsDEPREECATED\LeadsTelefones;
use App\Models\Setores;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = ['vendedor_id', 'cnpj', 'cpf', 'status_id', 'setor_id'];

    protected $with = ['setor', 'dados', 'vendedor', 'telefones'];
    protected $appends = ['status'];

    protected $hidden = ['setor_id', 'status_id', 'vendedor_id', 'created_at', 'updated_at'];

    // =======================
    // Atributos (Getters/Setters)
    // =======================
    public function getStatusAttribute()
    {
        return $this->leadStatus ? $this->leadStatus : null;
    }

    // =======================
    // Relacionamentos
    // =======================
    public function vendedor()
    {
        return $this->belongsTo(User::class, 'vendedor_id')->select('id', 'foto', 'name as nome');
    }

    public function setor()
    {
        return $this->belongsTo(Setores::class, 'setor_id');
    }

    public function dados()
    {
        return $this->hasOne(LeadDados::class, 'lead_id');
    }

    public function telefones()
    {
        return $this->hasMany(LeadsTelefones::class, 'lead_id');
    }

    public function leadStatus()
    {
        return $this->belongsTo(LeadStatus::class, 'status_id');
    }
}
