<?php

namespace App\Http\Requests\FluxoCaixa;

use Illuminate\Foundation\Http\FormRequest;

class FluxoCaixaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tipo' => 'required|string|max:255',
            'empresa_id' => 'required|numeric|min:0',
            'franquia_id' => 'required|numeric|min:0',
            'fornecedor_id' => 'required|numeric|min:0',
            'origem_id' => 'required|numeric|min:0',
            'descricao' => 'required|string|max:255',
            'nota' => 'nullable|string|max:255',
            'emissao' => 'nullable|date',
            'anexo' => 'nullable|file|mimes:jpg,png,pdf|max:2048',

//            'pagamentos' => 'sometimes|required|array|min:1',
//            'pagamentos.*.id' => 'sometimes|exists:pagamentos,id',
//            'pagamentos.*.valor' => 'required|numeric|min:0',
//            'pagamentos.*.data_pagamento' => 'nullable|date',
//            'pagamentos.*.forma_pagamento' => 'required|string|max:50',
//            'pagamentos.*.anexo' => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'numero.required' => 'O número da nota fiscal é obrigatório.',
            'numero.unique' => 'Esse número de nota fiscal já está registrado.',
            'valor_total.required' => 'O valor total é obrigatório.',
            'valor_total.numeric' => 'O valor total deve ser um número válido.',
            'cliente_id.exists' => 'O cliente selecionado não existe.',
            'pagamentos.*.valor.required' => 'O valor do pagamento é obrigatório.',
            'pagamentos.*.forma_pagamento.required' => 'A forma de pagamento é obrigatória.',
            // Adicione mais mensagens personalizadas, se necessário.
        ];
    }
}
