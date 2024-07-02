<?php

namespace App\Models;

use App\src\Orcamentos\EstruturasGeradores;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutosKitsSolar extends Model
{
    use HasFactory;

    protected $fillable = [
        'titulo',
        'sku',
        'inversor_id',
        'painel_id',
        'estrutura_id',
        'tipo_produto',
        'tensao',
        'preco_compra',
        'preco_venda',
        'items',
        'potencia_kit',
        'potencia_inversor',
        'potencia_modulo',
        'fase',
        'descricao',
        'status_distribuidora',
        'status',
        'estoque_disponivel',
        'hibrido',
        'estoque_disponivel_data'
    ];

    public function getKits($potencia, $dados)
    {
        $estruturasNomes = (new EstruturasGeradores())->estruturas();

        $primeiraPotenciaMin = $this->newQuery()
            ->where('potencia_kit', '<=', $potencia)
            ->where('estrutura_id', $dados->estrutura)
            ->orderByDesc('potencia_kit')
            ->limit(1)
            ->value('potencia_kit');

        $primeiraPotenciaMax = $this->newQuery()
            ->where('potencia_kit', '>=', $potencia)
            ->where('estrutura_id', $dados->estrutura)
            ->orderBy('potencia_kit')
            ->limit(1)
            ->value('potencia_kit');

        return $this->newQuery()
            ->leftJoin('produtos_marcas AS i', 'produtos_kits_solars.inversor_id', '=', 'i.id')
            ->leftJoin('produtos_marcas AS p', 'produtos_kits_solars.painel_id', '=', 'p.id')
            ->where('potencia_kit', '>=', $primeiraPotenciaMin)
            ->where('potencia_kit', '<=', $primeiraPotenciaMax)
            ->where('estrutura_id', $dados->estrutura)
            ->orderByDesc('potencia_kit')
            ->limit(50)
            ->selectRaw('
                produtos_kits_solars.*,
                i.nome AS inversor_nome, i.url_logo AS inversor_logo, i.url_foto AS inversor_foto,
                p.nome AS painel_nome, p.url_logo AS painel_logo, p.url_foto AS painel_foto
                ')
            ->get()
            ->transform(function ($item) use ($estruturasNomes) {
                $estrutura = $estruturasNomes[$item->estrutura_id];

                $item->titulo = 'Gerador ' . $item->potencia_kit . 'kWp ' . $item->inversor_nome . ' ' . $item->potencia_inversor . 'k ' .
                    $item->tensao . 'V ' . $item->fase . ' ' . $item->painel_nome . ' ' . $estrutura;

                $item->inversor_nome = $item->inversor_nome;
                $item->inversor_logo = $item->inversor_logo;

                $item->painel_nome = $item->painel_nome;
                $item->painel_logo = $item->painel_logo;

                $item->preco_venda = $item->preco_compra;
                return $item;
            })->toArray();
    }
}
