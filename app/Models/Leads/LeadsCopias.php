<?php

namespace App\Models\Leads;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeadsCopias extends Model
{
    use HasFactory;

    protected $fillable = [
        'lead_id',
        'nome',
        'user_id',
        'importacao_id',
        'cnpj',
        'rg',
        'cpf',
        'inscricao_estadual',
        'razao_social',
        'email',
        'endereco',
        'cnae',
        'capital_social',
        'tipo',
        'porte',
        'atividade_principal',
        'natureza_juridica',
        'quadro_societario',
        'situacao',
        'data_situacao',
        'data_abertura',
    ];

    public function create($idLead, $dados)
    {
        $this->newQuery()
            ->create(['lead_id' => $idLead, ...$dados]);
    }

    public function atualizarRegistro($cnpj, $dadosAntigos, $dadosNovos, $importacao)
    {
        $registroAtualizado = (new Leads())->newQuery()->where('cnpj', $cnpj)->first();

        $colunasAlteradas = [];
        foreach ($dadosNovos as $coluna => $valor) {
            if ($coluna != 'importacao_id' && $coluna != 'endereco' && $coluna != 'status_data')
                if ($dadosAntigos->$coluna != $registroAtualizado->$coluna) {
                    $colunasAlteradas[$coluna] = $valor;
                }
        }

        if (!empty($colunasAlteradas)) {
            $colunasAlteradas['lead_id'] = $dadosAntigos->id;
            $colunasAlteradas['importacao_id'] = $importacao;
            $this->insert($colunasAlteradas);
        }
    }


    public function get($id)
    {
        return $this->newQuery()
            ->where('lead_id', $id)
            ->get()
            ->transform(function ($item) {
                $item->data = date('d/m/y H:i', strtotime($item->created_at));
                return $item;
            });
    }

}
