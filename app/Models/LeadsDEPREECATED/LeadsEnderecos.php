<?php

namespace App\Models\LeadsDEPREECATED;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Log;

class LeadsEnderecos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'lead_id',
        'importacao_id',
        'cep',
        'rua',
        'numero',
        'complemento',
        'bairro',
        'cidade',
        'estado',
    ];

    public function criar(int $leadId, ?array $enderecos, ?int $importacao = null)
    {
        try {
            $this->create([
                'user_id' => id_usuario_atual(),
                'lead_id' => $leadId,
                'importacao_id' => $importacao,
                'cep' => $enderecos['cep'] ?? null,
                'rua' => $enderecos['rua'] ?? null,
                'numero' => $enderecos['numero'] ?? null,
                'complemento' => $enderecos['complemento'] ?? null,
                'bairro' => $enderecos['bairro'] ?? null,
                'cidade' => $enderecos['cidade'] ?? null,
                'estado' => $enderecos['estado'] ?? null,
            ]);
        } catch (\Exception $e) {
            Log::error('Erro ao criar dados do lead: ' . $e->getMessage(), [
                'user_id' => id_usuario_atual(),
                'lead_id' => $leadId,
                'importacao_id' => $importacao,
                'dados' => $enderecos
            ]);

            throw new \DomainException('Erro ao cadastrar endereco do lead.');
        }
    }
}
