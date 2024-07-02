<?php

namespace App\src\Produtos\Integracoes\Edeltec;

use App\Models\ProdutosIntegracoesHistoricos;
use App\Models\ProdutosKitsSolar;
use App\Models\ProdutosMarcas;
use App\src\Orcamentos\EstruturasGeradores;
use Illuminate\Support\Facades\Http;

class Requisicao
{
    private function requisicao($token, $page)
    {
        $url = 'https://api.edeltecsolar.com.br/produtos/integration';

        $response = Http::withToken($token)
            ->get($url, [
                'limit' => '10000',
                'page' => $page,
                'tipo' => 'GERADOR FOTOVOLTAICO'
            ])->json();

        $items = $response['items'];
        $metas = $response['meta'];

        return $items;
    }

    public function get($token)
    {
        $qtds = 0;
        $marcasNomes = (new ProdutosMarcas())->marcasId();
        $estruturasNomes = (new EstruturasGeradores())->estruturasId();

        for ($i = 1; $i <= 3; $i++) {
            $items = $this->requisicao($token, $i);

            foreach ($items as $item) {
                if ($item['codProd'] ?? null) {
                    $produtoData = [
                        'titulo' => $item['titulo'],
                        'sku' => $item['codProd'],
                        'inversor_id' => $marcasNomes[$item['fabricante']],
                        'painel_id' => $marcasNomes[$item['marca']],
                        'estrutura_id' => $estruturasNomes[strtoupper($item['estrutura'])],
                        'tensao' => $item['tensaoSaida'],
                        'preco_compra' => $item['precoDoIntegrador'],
                        'items' => $item['componentes'],
                        'potencia_kit' => $item['potenciaGerador'],
                        'potencia_inversor' => $item['potenciaInversor'],
                        'potencia_modulo' => $item['potenciaModulo'],
                        'fase' => $item['fase'],
                        'descricao' => $item['descricao'],
                        'status_distribuidora' => $item['ativo'],
                        'status' => $item['ativoVendedor'],
                        'estoque_disponivel' => $item['disponivelEmEstoque'],
                        'hibrido' => $item['inversorHibrido'],
                        'estoque_disponivel_data' => $item['dataPrevistaParaDisponibilidade'],
                        'tipo_produto' => 'geradores',
                    ];

                    ProdutosKitsSolar::updateOrCreate(
                        ['sku' => $produtoData['sku']],
                        $produtoData
                    );
                    $qtds++;
                }
            }
        }

        (new ProdutosIntegracoesHistoricos())->create(1, $qtds);
    }
}
