<?php

namespace App\Models\LeadsDEPREECATED;

use App\Models\Enderecos;
use App\Models\Lead\LeadEndereco;
use App\Models\Lead\LeadTelefones;
use App\Models\Setores;
use App\Models\User;
use App\Services\Lead\EncaminharLeadService;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @deprecated
 */
class Leads extends Model
{
    use HasFactory;

    protected $table = 'leads';

    protected $fillable = [
        'user_id',
        'sdr_id',
        'status',
        'contato_data',
        'importacao_id',
        'nome',
        'setor_id',
        'cnpj',
        'razao_social',
        'endereco',
        'atendente',
        'rg',
        'cpf',
        'data_nascimento',
        'inscricao_estadual',
        'pessoa_juridica',
        'email',
        'telefone',
        'cidade',
        'estado',
        'status_data',
        'data_encaminhado',
        'meio_contato',
        'infos',
        'classificacao',
        'anotacoes',
        'ultimo_pedido_data',
        'capital_social',
        'tipo',
        'porte',
        'atividade_principal',
        'natureza_juridica',
        'quadro_societario',
        'situacao',
        'cnae',
        'data_situacao',
        'data_abertura',
    ];

    protected $hidden = ['user_id', 'setor_id', 'endereco', 'created_at'];

    protected $appends = ['cadastro_data', 'status_prazo', 'ultimo_pedido', 'contato_ultimo_data'];

    // get attributes
    public function getStatusAttribute()
    {
        if ($this->attributes['status'] === 'contato_direto') {
            $dataContato = Carbon::parse($this->attributes['status_data']);
            $diff = $dataContato->diffInDays(Carbon::now());

            if ($diff > 6) {
                (new EncaminharLeadService())->encaminharOportunidade([$this->attributes['id']], null);
                return 'inativo';
            }
        }

        if ($this->attributes['status'] === 'conexao_proativo') {
            $dataContato = Carbon::parse($this->attributes['status_data']);
            $diff = $dataContato->diffInDays(Carbon::now());

            if ($diff > 4) {
                (new EncaminharLeadService())->encaminharOportunidade([$this->attributes['id']], null);
                return 'inativo';
            }
        }

        if ($this->attributes['status'] === 'ativo') {
            $dataContato = Carbon::parse($this->attributes['ultimo_pedido_data']);
            $diff = $dataContato->diffInDays(Carbon::now());

            if ($diff > 150) {
                (new EncaminharLeadService())->encaminharOportunidade([$this->attributes['id']], null);
                return 'inativo';
            }
        }
        return $this->attributes['status'];
    }

    public function getStatusDataAttribute()
    {
        return $this->attributes['status_data'] ? Carbon::parse($this->attributes['status_data'])->format('d/m/Y H:i:s') : null;
    }

    public function getContatoUltimoDataAttribute()
    {
        return $this->attributes['contato_data'] ? Carbon::parse($this->attributes['contato_data'])->format('d/m/y H:i:s') : null;
    }

    public function getCadastroDataAttribute()
    {
        return $this->attributes['created_at'] ? Carbon::parse($this->attributes['created_at'])->format('d/m/Y H:i:s') : null;
    }

    public function getCnpjAttribute()
    {
        return converterCNPJ($this->attributes['cnpj']);
    }

    public function getStatusPrazoAttribute()
    {
        return intval(Carbon::now()->diffInDays(Carbon::parse($this->attributes['status_data'])));
    }

    public function getUltimoPedidoAttribute()
    {
        return intval(Carbon::now()->diffInDays(Carbon::parse($this->attributes['ultimo_pedido_data']), true));
    }

    // relations
    public function telefones()
    {
        return $this->hasMany(LeadTelefones::class, 'lead_id')
            ->select(['id', 'lead_id', 'numero', 'status_whatsapp', 'status_telefone', 'whatsapp_id', 'whatsapp_picture']);
    }

    public function consultor()
    {
        return $this->belongsTo(User::class, 'user_id')
            ->select(['id', 'name as nome', 'foto']);
    }

    public function setor()
    {
        return $this->belongsTo(Setores::class, 'setor_id')
            ->select(['id', 'nome', 'cor']);
    }

    public function copias()
    {
        return $this->hasMany(LeadsCopias::class, 'lead_id')
            ->select(['id', 'lead_id']);
    }

    public function cidadeEstado()
    {
        return $this->hasOne(LeadEndereco::class, 'lead_id', 'id');
    }

    public function getAll()
    {
        return $this->with(['consultor', 'setor', 'cidadeEstado', 'telefones']);
    }

    public function dadosCard()
    {
        return $this
            ->getAll()
            ->select([
                'id',
                'user_id',
                'setor_id',
                'nome',
                'razao_social',
                'cnpj',
                'cpf',
                'status',
                'created_at',
                'status_data',
                'classificacao',
                'endereco',
                'ultimo_pedido_data',
                'contato_data'
            ]);
    }

    /**
     * @deprecated
     */
    public function cards($setor = null, $usuario = null)
    {
        $sequenciaStatus = (new \App\src\Leads\StatusLeads())->sequenciaStatus();
        $sequenciaStatusIndice = (new \App\src\Leads\StatusLeads())->sequenciaStatusDadosIndice();

        $query = $this->newQuery()
            ->with(['consultor', 'setor', 'telefones', 'cidadeEstado'])
            ->when($setor, function ($q) use ($setor) {
                return $q->where('setor_id', $setor);
            })
            ->when($usuario, function ($q) use ($usuario) {
                return $q->where('user_id', $usuario);
            })
            ->whereIn('user_id', supervisionados(id_usuario_atual()))
            ->whereIn('status', $sequenciaStatus)
            ->latest('status_data');

        $resultados = $query->get()->groupBy('status');

        // Processamento sem recriar objetos manualmente
        return $resultados->mapWithKeys(function ($items, $status) use ($sequenciaStatusIndice) {
            return [
                $status => [
                    'status' => $status,
                    'status_dados' => $sequenciaStatusIndice[$status] ?? null,
                    'items' => $items->take(10)->map(function ($item) use ($sequenciaStatusIndice, $status) {
                        return [
                            'id' => $item->id,
                            'nome' => $item->nome,
                            'localidade' => [
                                'cidade' => $item->cidadeEstado->cidade ?? null,
                                'estado' => $item->cidadeEstado->estado ?? null,
                            ],
                            'avancar_status_url' => $sequenciaStatusIndice[$status]['url_avancar_status'] ?? null,
                            'consultor' => $item->consultor,  // Usar o relacionamento 'consultor' diretamente
                            'razao_social' => $item->razao_social,
                            'cnpj' => converterCNPJ($item->cnpj),
                            'cpf' => $item->cpf,
                            'status' => $item->status,
                            'status_data' => date('d/m/y', strtotime($item->created_at)),
                            'status_data_dias' => $item->status_data_dias,
                            'classificacao' => $item->classificacao,
                            'setor' => $item->setor,  // Usar o relacionamento 'setor' diretamente
                            'telefones' => $item->telefones,  // Usar o relacionamento 'telefones' diretamente
                        ];
                    }),
                ]
            ];
        })->sortBy(function ($item, $key) use ($sequenciaStatus) {
            $index = array_search($key, $sequenciaStatus);
            return $index !== false ? $index : PHP_INT_MAX;
        });
    }

    public function setConatoData($id)
    {
        $this->newQuery()
            ->find($id)
            ->update(['contato_data' => now()]);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}

