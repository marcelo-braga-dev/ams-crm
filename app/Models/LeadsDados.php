<?php

namespace App\Models;

use App\src\Leads\Dados\DadosLeads;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsDados extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'chave',
        'valor',
        'nome',
        'status',
    ];

    public function create($id, $chave, $valor = null, $nome = null)
    {
        $this->newQuery()
            ->create([
                'lead_id' => $id,
                'chave' => $chave,
                'valor' => $valor,
                'nome' => $nome,
            ]);
    }

    public function dados($id, $chave)
    {
        return $this->newQuery()
            ->where('lead_id', $id)
            ->where('chave', $chave)
            ->get()
            ->transform(function ($item) {
                return converterTelefone($item->valor);
            });
    }

    public function telefones($convertido = false)
    {
        $items = $this->newQuery()
            ->where('chave', 'telefone')
            ->get();

        if ($convertido) $items->transform(function ($item) {
            return [
                'lead_id' => $item->lead_id,
                'valor' => converterTelefone($item->valor),
            ];
        });

        $res = [];
        foreach ($items as $item) {
            $res[$item['lead_id']][] = $item['valor'];
        }
        return $res;
    }

    public function get($chave, $idLead)
    {
        return $this->newQuery()
            ->where('chave', $chave)
            ->where('lead_id', $idLead)
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'telefone' => converterTelefone($item->valor),
                ];
            });
    }

    public function atualizar($idLead, $dados = [])
    {
        $chaves = (new DadosLeads());

        if ($dados) foreach ($dados as $id => $dado) {
            $this->newQuery()
                ->updateOrCreate(
                    ['id' => $id],
                    ['lead_id' => $idLead, 'chave' => $chaves->chaveTelefone(), 'valor' => converterInt(converterTelefone($dado)), 'nome' => $chaves->nomeTelefone()]
                );
        }
    }
}
