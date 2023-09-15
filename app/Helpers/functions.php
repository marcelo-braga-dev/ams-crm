<?php
if (!function_exists('print_pre')) {
    function print_pre($valor, $titulo = null)
    {
        echo
            '<style>body{background-color: black; color: white}</style>
            <h2>' . $titulo . '</h2>
         <pre>';
        print_r($valor);
        echo
        '<pre>';
        exit();
    }
}

if (!function_exists('convert_money_float')) {
    function convert_money_float($arg, $decimais = 2)
    {
        if (is_numeric($arg)) return $arg;

        try {
            if (is_string($arg)) {
                $arg = str_replace('.', '', $arg);
                $arg = str_replace(',', '.', $arg);
                $arg = number_format($arg, $decimais, '.', '');
            }
        } catch (ErrorException $exception) {
            return 1;
        }

        return $arg;
    }
}

if (!function_exists('convert_float_money')) {
    function convert_float_money($arg, $decimais = 2)
    {
        if (is_numeric($arg)) {
            $arg = number_format($arg, $decimais, ',', '.');
        }
        if (empty($arg)) return '0,00';
        return $arg;
    }
}

if (!function_exists('convertFloatToMoney')) {
    function convertFloatToMoney($valor): string
    {
        return number_format($valor, 2, ',', '.');
    }
}

if (!function_exists('modalSucesso')) {
    function modalSucesso($mensagem)
    {
        session()->flash('sucesso', $mensagem);
    }
}

if (!function_exists('modalErro')) {
    function modalErro($mensagem)
    {
        session()->flash('erro', $mensagem);
    }
}

if (!function_exists('convert_data')) {
    function convert_data($valor)
    {
        return date('d/m/y H:i:s', strtotime($valor));
    }
}
