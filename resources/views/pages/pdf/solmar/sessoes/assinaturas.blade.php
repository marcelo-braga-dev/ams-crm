<div class="body">
    <div style="text-align: center;margin-bottom:60px">
        <br>
        _____/_____/_________ <br>
        <span style="font-size:13px">
        Data da Assinatura
    </span>

    </div>

    <style>
        th, td {
            padding: 8px;
            text-align: center;
            vertical-align: middle;
        }

        #assinatura {
            border-top: 1px solid black;
            border-right: 0;
            border-left: 0;
            border-bottom: 0;
            vertical-align: top;
        }

        #sem_borda {
            border: 0 solid white;
        }
    </style>

    <table>
        <tr>
            <td>
                <img src="storage/proposta-comercial/solmar/assinatura-1.jpeg"
                     style="width:200px;margin-left:15px">
            </td>

            <td></td>

            <td>
                <img src="storage/proposta-comercial/solmar/assinatura-antonio.jpg"
                     style="width:180px;margin-left:30px">
            </td>

            <td></td>

            <td>

            </td>
        </tr>
        <tr>
            <td id="assinatura" width="30%">
                <b>Solmar Energia</b><br>
                CNPJ: 27.908.036/0001-24<br>
                (44) 3029-1225<br>
                contato@solmarenergia.com.br
            </td>

            <td id="sem_borda" width="5%"></td>

            <td id="assinatura" width="30%">
                <b>Waldir Antonio <br>Armolinski de Souza</b><br>
                Engenheiro Responsável<br>
                CREA PR-164409/D
            </td>

            <td id="sem_borda" width="5%"></td>

            <td id="assinatura" width="30%">
{{--                <b>{{ getNomeCliente($cliente->id) }}</b><br>--}}
                @if (!empty($dadosCliente['rg']))
                    RG: {{ $dadosCliente['rg'] }}<br>
                @endif
                @if (!empty($dadosCliente['cpf']))
                    CPF: {{ $dadosCliente['cpf'] }}<br>
                @endif
                @if (!empty($dadosCliente['cnpj']))
                    CNPJ: {{ $dadosCliente['cnpj'] }}<br>
                @endif
                *Aceite da Proposta Comercial
            </td>
        </tr>
    </table>
</div>

