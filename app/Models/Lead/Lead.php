<?php

namespace App\Models\Lead;

use App\Models\Ferramentas\Whatsapp\WhatsappUsuario;
use App\Models\Pedido\Pedido;
use App\Models\Pedidos;
use App\Models\Setores;
use App\Models\User;
use App\src\Leads\StatusDados;
use App\src\Leads\StatusLeads;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'status', 'vendedor_id', 'cnpj', 'cpf', 'status_id', 'setor_id', 'ultimo_pedido_data', 'status_data', 'contato_data'];

    protected $with = ['endereco', 'setor', 'vendedor', 'telefones', 'whatsapp'];

    protected $appends = ['status_date', 'status_nome', 'status_dados', 'extras', 'emails'];

    protected $hidden = ['setor_id', 'status_id', 'vendedor_id', 'created_at', 'updated_at'];

    // =======================
    // Getters
    // =======================
    public function getStatusNomeAttribute()
    {
        return (new StatusLeads())->statusNome($this->attributes['status']);
    }

    public function getStatusDadosAttribute()
    {
        return (new StatusDados())->dado($this->attributes['status']);
    }

    public function getExtrasAttribute()
    {
        return [
            'cnae' => $this->attributes['cnae'],
            'situacao' => $this->attributes['situacao'],
            'atividade_principal' => $this->attributes['atividade_principal'],
            'natureza_juridica' => $this->attributes['natureza_juridica'],
            'quadro_societario' => $this->attributes['quadro_societario'],
            'data_situacao' => $this->attributes['data_situacao'],
            'data_abertura' => $this->attributes['data_abertura'],
            'data_nascimento' => $this->attributes['data_nascimento'],
            'capital_social' => $this->attributes['capital_social'],
            'tipo' => $this->attributes['tipo'],
            'porte' => $this->attributes['porte'],
        ];
    }

    public function getStatusDateAttribute()
    {
        return Carbon::parse($this->attributes['status_data'])->format('d/m/Y H:i');
    }

    public function getCnpjAttribute()
    {
        return converterCNPJ($this->attributes['cnpj']);
    }

    public function getEmailsAttribute()
    {
        return [$this->attributes['email'] ?? null];
    }

    // =======================
    // Setters
    // =======================

    public function setStatusAttribute($value)
    {
        (new LeadStatusHistoricos())->create($this->attributes['id'], $this->attributes['status'], null, $this->attributes['user_id']);
        return $this->attributes['status'] = $value;
    }

    // =======================
    // Relacionamentos
    // =======================
    public function endereco()
    {
        return $this->hasOne(LeadEndereco::class, 'lead_id', 'id');
    }

    public function whatsapp()
    {
        return $this->hasOne(WhatsappUsuario::class, 'user_id', 'user_id');
    }

    public function vendedor()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'foto', 'name as nome');
    }

    public function setor()
    {
        return $this->belongsTo(Setores::class, 'setor_id');
    }

    public function telefones()
    {
        return $this->hasMany(LeadTelefones::class, 'lead_id');
    }

    //
    public function pedidos()
    {
        return $this->hasMany(Pedido::class, 'lead_id')
            ->select(['id', 'status','preco_venda', 'lead_id', 'user_id', 'created_at']);
    }

    public function statusHistorico()
    {
        return $this->hasMany(LeadStatusHistoricos::class, 'lead_id')
            ->orderByDesc('id');
    }
}
