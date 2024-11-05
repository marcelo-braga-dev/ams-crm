<?php

namespace App\Models;

use App\Models\LeadsDEPREECATED\LeadsANTIGO;
use App\Models\LeadsDEPREECATED\LeadsCopias;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @deprecated
 */
class LeadsImportarHistoricos extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'setor',
        'novas',
        'enriquecidas',
        'url_file',
    ];

    public function create($setor)
    {
        return $this->newQuery()
            ->create([
                'user_id' => id_usuario_atual(),
                'setor' => $setor,
            ])->id;
    }

    public function setUrlFile($id, $url)
    {
        $this->newQuery()
            ->find($id)
            ->update([
                'url_file' => $url
            ]);
    }

    public function atualizar($id, $dadosPlanilha)
    {
        $qtdLeads = (new LeadsANTIGO())->newQuery()
            ->where('importacao_id', $id)
            ->count();

        $qtdEnriquecida = (new LeadsCopias())->newQuery()
            ->where('importacao_id', $id)
            ->count();

        $this->newQuery()
            ->find($id)
            ->update([
                'novas' => ($qtdLeads - $qtdEnriquecida),
                'enriquecidas' => $qtdEnriquecida
            ]);
    }

    public function historicos()
    {
        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNome();

        return $this->newQuery()
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) use ($nomes, $setores) {
                return [
                    'id' => $item->id,
                    'nome' => $nomes[$item->user_id],
                    'setor' => $setores[$item->setor] ?? '',
                    'qtd' => $item->novas,
                    'enriquecidas' => $item->enriquecidas ?? 0,
                    'url_file' => url_arquivos($item->url_file),
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });
    }

    public function datasImportacao()
    {
        return $this->newQuery()
            ->where('novas', '>', 0)
            ->orderByDesc('id')
            ->get()
            ->transform(function ($item) {
                return [
                    'id' => $item->id,
                    'data' => date('d/m/y H:i', strtotime($item->created_at))
                ];
            });
    }

    public function getDados($id)
    {
        $nomes = (new User())->getNomes();
        $setores = (new Setores())->getNome();

        $item = $this->newQuery()->find($id);

        return [
            'id' => $item->id,
            'nome' => $nomes[$item->user_id],
            'setor' => $setores[$item->setor] ?? '',
            'qtd' => $item->novas,
            'enriquecidas' => $item->enriquecidas,
            'data' => date('d/m/y H:i', strtotime($item->created_at))
        ];
    }
}
