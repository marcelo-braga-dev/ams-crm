<?php

namespace App\Models\LeadsDEPREECATED;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class LeadsDadosSecundarios extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'importacao_id',
        'chave',
        'valor',
    ];

    public function criar(int $leadId, $dados, ?int $importacao = null)
    {
        $idUsuario = id_usuario_atual();
        $records = [];

        foreach ($dados as $dado) {
            $records[] = [
                'user_id' => $idUsuario,
                'lead_id' => $leadId,
                'importacao_id' => $importacao,
                'chave' => $dado['chave'],
                'valor' => $dado['valor'],
            ];
        }

        if (!empty($records)) {
            try {
                $this->insert($records);
            } catch (\Exception $e) {
                Log::error('Erro ao criar dados adicionais do lead: ' . $e->getMessage(), [
                    'user_id' => id_usuario_atual(),
                    'lead_id' => $leadId,
                    'importacao_id' => $importacao,
                    'dados' => $dados
                ]);

                throw new \DomainException('Erro ao cadastrar dados do lead.');
            }
        }
    }
}
