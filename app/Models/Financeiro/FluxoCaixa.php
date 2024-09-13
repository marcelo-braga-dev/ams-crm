<?php

namespace App\Models\Financeiro;

use App\Models\FluxoCaixasConfig;
use App\Models\Fornecedores;
use App\Models\Franquias;
use App\Models\User;
use App\Services\Images;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class FluxoCaixa extends Model
{
    use HasFactory;

    protected $with = ['autor'];

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

//    atributos
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
        return $this->attributes['emissao'] ? Carbon::parse($this->attributes['emissao'])->format('d/m/Y H:i:s') : null;
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
        return $this->belongsTo(FluxoCaixasConfig::class, 'empresa_id',);
    }

    public function franquia()
    {
        return $this->belongsTo(Franquias::class, 'franquia_id',);
    }

//    metodos
    public function cadastrar($dados)
    {
        $anexo = null;
        if ($dados['anexo'] ?? null) {
            $anexo = (new Images)->armazenar($dados, 'anexo', 'financeiro');
        }

        try {
            DB::transaction(function () use ($dados, $anexo) {
                $fluxo = $this->create([
                    'user_id' => id_usuario_atual(),
                    'tipo' => $dados->tipo,
                    'empresa_id' => $dados->empresa,
                    'franquia_id' => $dados->franquia,
                    'fornecedor_id' => $dados->fornecedor,
                    'origem_id' => $dados->origem,
                    'descricao' => $dados->descricao,
                    'nota' => $dados->nota_fiscal,
                    'emissao' => $dados->emissao,
                    'anexo' => $anexo,
                ]);

                (new FluxoCaixaPagamento())->cadastrar($fluxo->id, $dados['pagamentos'] ?? []);
            });

        } catch (\Exception $exception) {
            throw new \DomainException('Falha no cadastro.');
        }
    }

    public function getRegistros()
    {
        return $this->with(['pagamentos', 'fornecedor', 'franquia', 'empresa'])
            ->withCount([
                'pagamentos as pagamentos_qtd',
                'pagamentos as pagos_qtd' => function ($query) {
                    $query->whereNotNull('data_baixa');
                }
            ])
            ->get()->toArray();
    }
}
