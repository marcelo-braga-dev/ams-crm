<?php

namespace App\Models\LeadsDEPREECATED;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class LeadsDados extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'importacao_id',
        'nome',
        'razao_social',
        'rg',
        'data_nascimento',
        'ie',
        'situacao',
    ];

    public function criar(int $leadId, $dados, ?int $importacao = null): void
    {
        try {
            $this->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $leadId,
                'importacao_id' => $importacao,
                'nome' => $dados['nome'],
                'razao_social' => $dados['razao_social'],
                'rg' => $dados['rg'],
                'data_nascimento' => $dados['data_nascimento'],
                'ie' => $dados['ie'],
                'situacao' => $dados['situacao']
            ]);
        } catch (\Exception $e) {

            Log::error('Erro ao criar dados do lead: ' . $e->getMessage(), [
                'user_id' => id_usuario_atual(),
                'lead_id' => $leadId,
                'importacao_id' => $importacao,
                'dados' => $dados
            ]);

            throw new \DomainException('Erro ao cadastrar dados do lead.');
        }
    }
}
