<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Http\Request;

class PedidosRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(Request $request)
    {
        return [
            //'nome' => ['required', 'max:255'],
            //'razao_social' => ['required', 'max:255'],
            //'rg' => ['required', 'max:255'],
            //'cpf' => ['required', 'max:255'],
            //'cnpj' => ['required', 'max:255'],
            //'telefone' => ['required', 'max:255'],
            //'endereco' => ['required', 'max:255'],
            //'file_rg' => ['required'],
            //'file_cpf' => ['required'],
            //'file_cnh' => ['required'],
            //'file_cartao_cnpj' => ['required'],
            //'file_comprovante_residencia' => ['required'],
            //'preco' => ['required', 'max:10'],
            //'fornecedor' => ['required', 'max:255'],
            //'file_orcamento' => ['required'],
            ////'obs' => ['required', 'max:255'],
            //'forma_pagamento' => ['required', 'max:255'],
        ];
    }

    public function messages()
    {
        return [
            'nome.required' => 'Insira o Nome.',
            'razao_social.required' => 'Insira a Razão Social.',
            'rg.required' => 'Insira o Número do RG.',
            'cpf.required' => 'Insira o Numero do CPF.',
            'cnpj.required' => 'Insira o Número do CNPJ.',
            'telefone.required' => 'Insira o Telefone.',
            'endereco.required' => 'Insira o Endereço.',
            'file_rg.required' => 'Insira a Foto do RG.',
            'file_cpf.required' => 'Insira a Foto do CPF.',
            'file_cnh.required' => 'Insira a Foto do CNH.',
            'file_cartao_cnpj.required' => 'Insira a Foto do Cartão CNPJ.',
            'file_comprovante_residencia.required' => 'Insira o Comprovante de Residência.',
            'preco.required' => 'Insira o Preço.',
            'preco.max' => 'Preço máximo 99.999.999,00',
            'fornecedor.required' => 'Insira o Fornecedor.',
            'file_orcamento.required' => 'Insira a Foto ou PDF do Orçamento.',
            'forma_pagamento.required' => 'Insira a Forma de Pagamento.',
        ];
    }
}
