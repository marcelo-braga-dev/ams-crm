<?php

namespace App\Http\Controllers\Admin\Produtos\Integracoes\Edeltec;

use Illuminate\Support\Facades\Http;

class Requisicao
{
    public function get($token)
    {
        $url = 'https://api.edeltecsolar.com.br/produtos/integration';

        $response = Http::withToken($token)
            ->get($url, [
                'limit' => '15',
                'page' => '50',
                'tipo' => 'GERADOR FOTOVOLTAICO'
            ])->json();

        $produtos = $response['items'];
        $metas = $response['meta'];
        dd($produtos);
        $produto = [];
        foreach ($produtos as $item) {
            $produto[] = [
                'titulo' => $item['titulo'],
                'sku' => $item['codProd'],
                'marca_inversor' => $item['fabricante'],
                'marca_painel' => $item['marca'],
                'items' => $item['componentes'],
                'tipo_produto' => $item['tipoDeProduto'],
                'preco_compra' => $item['precoDoIntegrador'],
                'descricao' => $item['descricao'],

                'estrutura' => $item['estrutura'],
                'potencia_kit' => $item['potenciaGerador'],
                'potencia_inversor' => $item['potenciaInversor'],
                'potencia_modulo' => $item['potenciaModulo'],
                'fase' => $item['fase'],
                'tensao' => $item['tensaoSaida'],

                'status_distribuidora' => $item['ativo'],
                'status' => $item['ativoVendedor'],
                'estoque_disponivel' => $item['disponivelEmEstoque'],
                'estoque_disponivel_data' => $item['dataPrevistaParaDisponibilidade'],
                'hibrido' => $item['inversorHibrido'],
            ];
        }
        dd($produto);
        print_pre($produto);

        print_pre($response['items'][10]);
    }
}
