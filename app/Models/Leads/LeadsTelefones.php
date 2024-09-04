<?php

namespace App\Models\Leads;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class LeadsTelefones extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'numero',
        'status_whatsapp',
        'status_telefone',
    ];

    public function criar(int $leadId, array $telefones, ?int $importacao = null)
    {
        $records = [];

        foreach ($telefones as $telefone) {
            if ($telefone) $records[] = [
                'lead_id' => $leadId,
                'id' => $telefone['id'] ?? null,
                'numero' => converterInt(converterTelefone($telefone['numero'] ?? $telefone)),
            ];
        }

        if (!empty($records)) {
            try {
                foreach ($records as $record) {
                    $this->updateOrCreate(
                        ['id' => $record['id']], // Critério de busca pelo ID
                        [
                            'lead_id' => $record['lead_id'],
                            'numero' => $record['numero'],
                        ]
                    );
                }
            } catch (\Exception $e) {
                Log::error('Erro ao cadastrar telefones do lead: ' . $e->getMessage(), [
                    'user_id' => id_usuario_atual(),
                    'lead_id' => $leadId,
                    'importacao_id' => $importacao,
                    'dados' => $telefones,
                ]);

                throw new \DomainException('Erro ao cadastrar telefones do lead.');
            }
        }

    }

    public function ativar($id)
    {
        $telefone = $this->find($id);

        if ($telefone) {
            $telefone->status_whatsapp = 2;
            $telefone->save();
        }
    }

    public function inativar($id)
    {
        $telefone = $this->find($id);

        if ($telefone) {
            $telefone->status_whatsapp = 0;
            $telefone->save();
        }
    }

    public function alterarStatusTelefone($id, $status)
    {
        $telefone = $this->find($id);

        if ($telefone) {
            $telefone->status_telefone = $status ? 2 : 0;
            $telefone->save();
        }
    }
}
