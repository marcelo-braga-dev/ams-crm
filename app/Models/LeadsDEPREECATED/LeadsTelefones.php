<?php

namespace App\Models\LeadsDEPREECATED;

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

    protected $appends = ['telefone'];

    public function getTelefoneAttribute()
    {
        return converterTelefone($this->attributes['numero']);
    }

    public function get($leadId)
    {
        return $this->newQuery()
            ->where('lead_id', $leadId)
            ->get()
            ->transform(function ($item) {
                $item->numero = converterTelefone($item->numero);
                $item->numero_padronizado = converterTelefone($item->numero);
                return $item;
            });
    }

    public function criar(int $leadId, array $telefones, ?int $importacao = null)
    {
        $records = [];

        foreach ($telefones as $telefone) {
            if (is_array($telefone)) $records[] = [
                'lead_id' => $leadId,
                'id' => $telefone['id'] ?? null,
                'numero' => ($telefone['numero'] ?? null) ? converterInt(converterTelefone($telefone['numero'])) : null,
            ];
        }

        if (!empty($records)) {
            try {
                foreach ($records as $record) {
                    if (!$record['numero']) {
                        $tel = $this->newQuery()->find($record['id']);
                        $tel?->delete();
                    } else
                        $this->updateOrCreate([
                            'id' => $record['id'],
                        ], [
                            'lead_id' => $record['lead_id'],
                            'numero' => $record['numero']
                        ]);

                }
            } catch (\Exception $e) {
                Log::error('Erro ao cadastrar telefones do lead: ' . $e->getMessage(), [
                    'user_id' => id_usuario_atual(),
                    'lead_id' => $leadId,
                    'importacao_id' => $importacao,
                    'dados' => $telefones,
                ]);

//                throw new \DomainException('Erro ao cadastrar telefones do lead.');
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
