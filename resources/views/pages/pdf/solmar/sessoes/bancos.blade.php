<div class="body">
    <table id="tabela" >
        <tr>
{{--            <th colspan="{{ count($bancos) }}" style="padding: 10px">--}}
{{--                <span style="color: black; font-size: 18px"><b>Financiamentos</b></span>--}}
{{--            </th>--}}
        </tr>
        <tr style=" border:1px solid white;">
{{--            @foreach($bancos as $items)--}}
{{--                <?php--}}
{{--                $calcJurosSicoob = 1 + ($items->juros_mensal / 100);--}}
{{--                $valorCarenciaSicoob = $orcamento->preco_cliente * pow($calcJurosSicoob, $items->carencia);--}}
{{--                $valorParcela = $valorCarenciaSicoob / ((1 - pow(($calcJurosSicoob), - $items->qtd_parcelas)) / ($items->juros_mensal / 100));--}}
{{--                ?>--}}
{{--                <td style="background-color:white; padding: 10px; text-align: center">--}}
{{--                    <img src="storage/{{ $items->img_logo }}" width="80"><br>--}}
{{--                    <span style="font-size: 12px;"><br>--}}
{{--                        {{ $items->qtd_parcelas }} x R$ {{ convert_float_money($valorParcela) }}*--}}
{{--                    </span><br>--}}
{{--                    <span style="font-size: 10px">Carência de {{ $items->carencia }} meses</span><br>--}}
{{--                    <span style="font-size: 10px">Juros mensal: {{ convert_float_money($items->juros_mensal) }}%</span><br>--}}
{{--                </td>--}}
{{--            @endforeach--}}
        </tr>
    </table>
    <div style="align-text: center">
        <small>*Os valores podem variar de acordo com a taxa de juros da financiadora.</small>
    </div>
</div>
