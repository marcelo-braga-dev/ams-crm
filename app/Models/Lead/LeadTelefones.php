<?php

namespace App\Models\Lead;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class LeadTelefones extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'contato_nome',
        'numero',
        'whatsapp_id',
        'whatsapp_picture',
        'status_whatsapp',
        'status_telefone',
    ];

    protected $appends = ['telefone'];

    public function getTelefoneAttribute()
    {
        return converterTelefone($this->attributes['numero']);
    }

    public function criar(int $leadId, array $telefones, ?int $importacao = null)
    {
        $records = [];

        foreach ($telefones as $telefone) {
            $records[] = [
                'lead_id' => $leadId,
                'id' => $telefone['id'] ?? null,
                'contato_nome' => $telefone['contato_nome'] ?? null,
                'numero' => isset($telefone['numero'])
                    ? converterInt(converterTelefone($telefone['numero']))
                    : converterInt(converterTelefone($telefone)),
            ];
        }

        if (!empty($records)) {
            try {
                foreach ($records as $record) {
                    if (empty($record['numero'])) {
                        if (!empty($record['id'])) {
                            $tel = $this->newQuery()->find($record['id']);
                            $tel?->delete();
                        }
                        continue;
                    }

                    $this->updateOrCreate(
                        ['id' => $record['id']],
                        [
                            'lead_id' => $record['lead_id'],
                            'numero' => $record['numero'],
                            'contato_nome' => $record['contato_nome'],
                        ]
                    );
                }
            } catch (\Exception $e) {
                // Log detalhado em caso de erro
                Log::error('Erro ao cadastrar telefones do lead', [
                    'message' => $e->getMessage(),
                    'user_id' => id_usuario_atual(),
                    'lead_id' => $leadId,
                    'importacao_id' => $importacao ?? null,
                    'dados' => $telefones,
                ]);
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

    public function inativar($numero)
    {
        $this->where('numero', $numero)
            ->update(['status_whatsapp' => 0]);
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
