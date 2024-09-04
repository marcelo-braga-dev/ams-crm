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

            $this->insert([
                'lead_id' => $colunasAlteradas['lead_id'] ?? null,
                'nome' => $colunasAlteradas['nome'] ?? null,
                'user_id' => id_usuario_atual(),
                'importacao_id' => $colunasAlteradas['importacao_id'] ?? null,
                'cnpj' => $colunasAlteradas['cnpj'] ?? null,
                'rg' => $colunasAlteradas['rg'] ?? null,
                'cpf' => $colunasAlteradas['cpf'] ?? null,
                'inscricao_estadual' => $colunasAlteradas['inscricao_estadual'] ?? null,
                'razao_social' => $colunasAlteradas['razao_social'] ?? null,
                'email' => $colunasAlteradas['email'] ?? null,
                'endereco' => $colunasAlteradas['endereco'] ?? null,
                'cnae' => $colunasAlteradas['cnae'] ?? null,
                'capital_social' => $colunasAlteradas['capital_social'] ?? null,
                'tipo' => $colunasAlteradas['tipo'] ?? null,
                'porte' => $colunasAlteradas['porte'] ?? null,
                'atividade_principal' => $colunasAlteradas['atividade_principal'] ?? null,
                'natureza_juridica' => $colunasAlteradas['natureza_juridica'] ?? null,
                'quadro_societario' => $colunasAlteradas['quadro_societario'] ?? null,
                'situacao' => $colunasAlteradas['situacao'] ?? null,
                'data_situacao' => $colunasAlteradas['data_situacao'] ?? null,
                'data_abertura' => $colunasAlteradas['data_abertura'] ?? null,
            ]);
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
