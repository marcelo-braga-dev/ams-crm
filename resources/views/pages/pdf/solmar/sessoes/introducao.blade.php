<style>
    #tabela-introducao {
        text-align: center;
    }

    #tabela-introducao tr th {
        text-align: center;
        background-color: transparent;
        color: white;
        padding: 8px;
    }

    #tabela-introducao tr td {
        padding: 8px;
    }
</style>

<div class="body">
    <table id="tabela-introducao"
           style="color: black; backg round-image: linear-gradient(to bottom left, rgba(253, 199, 0, 1), rgba(255, 109, 10, 1));">
        <tr>
            <th>
                <span style="color: black;"><b>Cliente</b></span>
            </th>
            <th>
                <span style="color: black;"><b>Representante</b></span>
            </th>
        </tr>
        <tr style=" border:1px solid white;">
            <td style="background-color:white;  font-size: 18px">
{{--                {{ getNomeCliente($cliente->id) }}--}}
            </td>
            <td style="background-color:white; font-size: 18px">
{{--                {{ $vendedor->name }}--}}
            </td>
        </tr>
    </table>
    <br>
    <br>
    <div style=" text-align: center">
        <span style="font-size: 24px;">
{{--            Valor Total do Projeto: <b>R$ {{ convert_float_money($orcamento->preco_cliente) }}</b>--}}
        </span>
    </div>
</div>
