<?php

namespace App\Models\Financeiro;

use App\Models\FinanceirosEmpresas;
use App\Models\FluxoCaixasConfig;
use App\Models\Fornecedores;
use App\Models\Franquias;
use App\Models\User;
use App\Services\UploadFiles;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;

class FluxoCaixa extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'tipo',
        'status',
        'empresa_id',
        'franquia_id',
        'fornecedor_id',
        'origem_id',
        'descricao',
        'nota',
        'emissao',
        'anexo',
    ];

    protected $hidden = [
        'fornecedor_id',
        'franquia_id',
        'empresa_id',
        'user_id',
        'created_at',
        'updated_at',
    ];

    protected $with = ['autor', 'fornecedor', 'franquia', 'empresa'];

    protected $appends = ['valor_nota', 'cadastrado_dia'];

    protected static function booted()
    {
        static::addGlobalScope('withContagens', function ($query) {
            $query->withCount([
                'pagamentos as pagamentos_qtd',
                'pagamentos as pagos_qtd' => function ($query) {
                    $query->whereNotNull('data_baixa');
                }
            ]);
        });
    }

    public function scopeWithContagens($query)
    {
        return $query->withCount([
            'pagamentos as pagamentos_qtd',
            'pagamentos as pagos_qtd' => function ($query) {
                $query->whereNotNull('data_baixa');
            }
        ]);
    }

//    atributos
    public function getValorNotaAttribute()
    {
        return $this->pagamentos()->sum('valor');
    }

    public function getStatusAttribute()
    {
        return ($this->attributes['pagos_qtd'] >= $this->attributes['pagamentos_qtd']) ? 'pago' : 'aberto';
    }

    public function getAnexoAttribute()
    {
        return url_arquivos($this->attributes['anexo']);
    }

    protected function getEmissaoAttribute()
    {
        return $this->attributes['emissao'] ? Carbon::parse($this->attributes['emissao'])->format('d/m/Y') : null;
    }

    protected function getCadastradoDiaAttribute()
    {
        return $this->attributes['created_at'] ? Carbon::parse($this->attributes['created_at'])->format('d/m/Y H:i:s') : null;
    }

//    relacionamentos
    public function autor()
    {
        return $this->belongsTo(User::class, 'user_id', 'id')->select('id', 'name as nome', 'foto');
    }

    public function pagamentos()
    {
        return $this->hasMany(FluxoCaixaPagamento::class, 'fluxo_caixa_id', 'id')->with('autor');
    }

    public function fornecedor()
    {
        return $this->belongsTo(FluxoCaixasConfig::class, 'fornecedor_id',);
    }

    public function empresa()
    {
        return $this->belongsTo(FinanceirosEmpresas::class, 'empresa_id',);
    }

    public function franquia()
    {
        return $this->belongsTo(Franquias::class, 'franquia_id',);
    }

    protected function setAnexoAttribute($value)
    {
        $this->attributes['anexo'] = $this->uploadAnexo($value);
    }

//    metodos
    private function uploadAnexo($anexo)
    {
        if ($anexo) {
            return (new UploadFiles())->uploadFile($anexo, 'financeiro/fluxo_caixa/comprovantes');
        }
        return null;
    }

    public function getNota(): Builder
    {
        return $this->with(['pagamentos', 'fornecedor', 'franquia', 'empresa']);
    }
}
