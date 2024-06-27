<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Argon Dashboard') }}</title>
    {{-- Favicon --}}
    <link href="{{ asset('argon') }}/img/brand/favicon.png" rel="icon" type="image/png">
    {{-- Fonts --}}
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">

    {{-- Icons --}}
    <link href="{{ asset('argon') }}/vendor/nucleo/css/nucleo.css" rel="stylesheet">
    <link href="{{ asset('argon') }}/vendor/@fortawesome/fontawesome-free/css/all.min.css" rel="stylesheet">
    {{-- Argon CSS --}}
    <link type="text/css" href="{{ asset('argon') }}/css/argon.css?v=1.0.0" rel="stylesheet">
    <link href="{{ asset('assets') }}/select2/css/select2.min.css" rel="stylesheet">
</head>
<body>
<div class="container-fluid m-3 mb-6 px-md-6">
    <div class="card shadow mt-5">
        <div class="card-header border-bottom">
            <div class="row align-items-center">
                <div class="col-12 col-md-auto">
                    <h3 class="mb-0">
                        Proposta Comercial
                    </h3>
                </div>
                <div class="col text-right">
                    {{--                    <a class="btn btn-primary btn-sm" href="/">Baixar PDF</a>--}}
                </div>
            </div>
        </div>
        <div class="card-body" style=" background-color: #fafafa !important">
            <div class="row mb-3">
                <div class="col">
                    <div class="card card-stats shadow">
                        <!-- Card body -->
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Valor da Proposta</h5>
                                    <span class="h2 font-weight-bold mb-0">
                                            R$ {{ convert_float_money($orcamento->preco_cliente) }}
                                        </span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-primary text-white rounded-circle shadow">
                                        <i class="fas fa-dollar-sign"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card-stats shadow">
                        <!-- Card body -->
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Geração Estimada</h5>
                                    <span class="h2 font-weight-bold mb-0">
                                            {{ convert_float_money($orcamento->geracao, 0) }} <small>kWh/mês</small>
                                        </span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-primary text-white rounded-circle shadow">
                                        <i class="fas fa-sync-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card card-stats shadow">
                        <!-- Card body -->
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <h5 class="card-title text-uppercase text-muted mb-0">Potência total do Kit</h5>
                                    <span class="h2 font-weight-bold mb-0">
                                            {{ convert_float_money($kit->potencia_kit * $orcamento->qtd_kits, 2)  }} <small>kWp</small>
                                        </span>
                                </div>
                                <div class="col-auto">
                                    <div class="icon icon-shape bg-primary text-white rounded-circle shadow">
                                        <i class="fas fa-solar-panel"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Cliente --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <div class="row justify-content-between">
                                <div class="col-auto">
{{--                                    <h2>Cliente: {{ getNomeCliente($orcamento->clientes_id) }}</h2>--}}
                                    <small class="d-block">ID do Orçamento: #{{ $orcamento->id }}</small>
                                    <small class="d-block">Status: {{ $orcamento->status }}</small>
                                    <small class="d-block">
                                        Data Criação: {{ date('d/m/Y H:i', strtotime($orcamento->created_at)) }}
                                    </small>
                                </div>
                                <div class="col-auto text-muted align-self-center">
                                    <form method="POST" action="{{ route('orcamento.pdf') }}" target="_blank">
                                        @csrf
                                        <input type="hidden" name="id" value="{{ $orcamento->id }}">
                                        <input type="hidden" name="grafico_geracao" id="grafico_geracao">
                                        <input type="hidden" name="grafico_payback" id="grafico_payback">
                                        <button type="submit" class="btn btn-danger">
                                            <i class="fas fa-file-pdf"></i> Abrir PDF
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Info Estabelecimento --}}
            <div class="row mb-4">
                <div class="col-md-6">
                    <div class="card shadow">
                        <div class="card-body pb-0">
                            <x-tables.table-default>
                                <x-slot name="head">Informações do Local da Instalação</x-slot>
                                <x-slot name="body">
                                    @if ($metas['consumo'])
                                        <tr>
                                            <td>Média Consumo</td>
                                            <td>{{ $metas['consumo'] }} kWh/mês</td>
                                        </tr>
                                    @endif
                                    @if ($metas['consumo_fora_ponta'])
                                        <tr>
                                            <td>Média Consumo <br>Fora da Ponta</td>
                                            <td>{{ $metas['consumo_fora_ponta'] }} kWh/mês</td>
                                        </tr>
                                        <tr>
                                            <td>Média Consumo <br>na Ponta</td>
                                            <td>{{ $metas['consumo_ponta'] }} kWh/mês</td>
                                        </tr>
                                    @endif
                                    <tr>
                                        <td>Localidade</td>
                                        <td>{{ getCidadeEstado($orcamento->cidade) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Tensão</td>
                                        <td>{{ $orcamento->tensao }} V</td>
                                    </tr>
                                    <tr>
                                        <td>Estrutura</td>
                                        <td style="white-space: normal">{{ getEstrutura($orcamento->estrutura) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Direção da Instalação</td>
                                        <td>{{ ucfirst($orcamento->orientacao) }}</td>
                                    </tr>
                                    <tr>
                                        <td>Irradiação Solar (Média Anual)</td>
                                        <td>{{ str_replace('.', '.', getIrradiacao($orcamento->cidade)) }} kWh/m²</td>
                                    </tr>
                                </x-slot>
                            </x-tables.table-default>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card shadow">
                        <div class="card-body pb-0">
                            <small class="d-block">Kits Fotovoltaicos</small>
                            <p>{{ $orcamento->qtd_kits }}x {{ $kit->modelo }}</p>
                            <x-tables.table-default>
                                <x-slot name="head"></x-slot>
                                <x-slot name="body">
                                    <tr class="border-top">
                                        <td>ID do Kit</td>
                                        <td>#{{ $kit->id }}</td>
                                    </tr>
                                    <tr>
                                        <td>Potência total do Kit</td>
                                        <td>{{ convert_float_money($kit->potencia_kit * $orcamento->qtd_kits, 2)  }}
                                            kWp
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Potência dos Painéis</td>
                                        <td>{{ $kit->potencia_painel }} W</td>
                                    </tr>
                                    <tr>
                                        <td>Tensão de Saída</td>
                                        <td>{{ $kit->tensao }} V</td>
                                    </tr>
                                    <tr>
                                        <td>Marca dos Painés</td>
                                        <td>{{ $imagens[$kit->marca_painel]['nome'] }}</td>
                                    </tr>
                                    <tr>
                                        <td>Marca do Inversor</td>
                                        <td>{{ $imagens[$kit->marca_inversor]['nome'] }}</td>
                                    </tr>
                                </x-slot>
                            </x-tables.table-default>
                            <div class="row text-center mb-3 px-5">
                                <div class="col-6">
                                    <img class="img-thumbnail" alt="Logo do Painel"
                                         src="{{ asset('storage') . '/' . $imagens[$kit->marca_painel]['logo'] }}"/>
                                    <span class="d-block" style="font-size:12px">Painéis</span>
                                </div>
                                <div class="col-6">
                                    <img class="img-thumbnail" alt="Logo do Inversor"
                                         src="{{ asset('storage') . '/' . $imagens[$kit->marca_inversor]['logo'] }}"/>
                                    <span class="d-block" style="font-size:12px">Inversor</span>
                                </div>
                                <div class="col-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Produtos --}}
            <div class="row mb-4">
                <div class="col-12">
                    <div class="card shadow">
                        <div class="card-body">
                            <h3>Quantidade de Kits: {{ $orcamento->qtd_kits }} kits</h3>
                            <h4>Produtos de cada Kit</h4>
                            @php($linhas = explode('<br />', nl2br($kit->produtos)))
                            <ul>
                                @foreach($linhas as $linha)
                                    <li>{{ $linha }}</li>
                                @endforeach
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {{-- Trafo --}}
            @if(!empty($trafo))
                <div class="row mb-4">
                    <div class="col-12">
                        <div class="card shadow">
                            <div class="card-body">
                                <h4>Transformador</h4>
                                <small class="d-block">modelo</small>
                                <span class="d-block">{{ $trafo->modelo }}</span>
                                <span>Valor: R$ {{ convert_float_money($trafo->preco_cliente) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            @endif

            {{-- Graficos Geracao --}}
            <div class="card shadow mb-4">
                <div class="card-body pb-0">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <x-graficos.geracao-fotovoltaica geracao="{{ $orcamento->geracao }}"
                                                             cidade="{{ $orcamento->cidade }}">
                            </x-graficos.geracao-fotovoltaica>
                        </div>
                    </div>

                </div>
            </div>


            {{-- Payback --}}
            <div class="card shadow">
                <div class="card-body pb-0 align-items-center">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <x-graficos.payback-fotovoltaico preco-cliente="{{ $orcamento->preco_cliente }}">
                            </x-graficos.payback-fotovoltaico>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="{{ asset('argon') }}/vendor/jquery/dist/jquery.min.js"></script>
<script src="{{ asset('argon') }}/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="{{ asset('assets') }}/vendor/select2/dist/js/select2.min.js"></script>

@stack('js')

<script>
    $(document).ready(function () {
        $('.select2').select2();
    });
</script>

{{-- Argon JS --}}
<script src="{{ asset('argon') }}/js/argon.js?v=1.0.0"></script>

</body>
</html>
