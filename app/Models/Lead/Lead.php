<?php

namespace App\Models\Lead;

use App\Models\LeadsDEPREECATED\LeadsTelefones;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\src\Leads\StatusLeads;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status', 'vendedor_id', 'cnpj', 'cpf', 'status_id', 'setor_id'];

    protected $with = ['setor', 'vendedor', 'telefones'];
    protected $appends = ['status_date', 'status_nome'];

    protected $hidden = ['setor_id', 'status_id', 'vendedor_id', 'created_at', 'updated_at'];

    // =======================
    // Getters
    // =======================
    public function getStatusNomeAttribute()
    {
        return (new StatusLeads())->statusNome($this->attributes['status']);
    }

    public function getStatusDateAttribute()
    {
        return Carbon::parse($this->attributes['status_data'])->format('d/m/Y H:i');
    }

    public function getCnpjAttribute()
    {
        return converterCNPJ($this->attributes['cnpj']);
    }

    public function setStatusAttribute($value)
    {
        (new LeadStatusHistoricos())->create($this->attributes['id'], $this->attributes['status'], null, $this->attributes['user_id']);
        return $this->attributes['status'] = $value;
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

    public function pedidos()
    {
        return $this->hasMany(Pedidos::class, 'lead_id');
    }
}
